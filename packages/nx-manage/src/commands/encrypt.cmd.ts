import { createCommand } from 'commander';
import fastGlob from 'fast-glob';
import fs from 'fs-extra';
import hasha from 'hasha';
import { get, replace } from 'lodash';
import path from 'path';
import shell from 'shelljs';
import { execCmd } from '../helpers/exec.helper';
import { prepareAction } from '../helpers/prepare-action.helper';
import { validateSchema } from '../helpers/validate-schema.helper';
import { encryptSchema } from '../validators/encrypt.validator';

export const encrypt = createCommand('encrypt');

encrypt
  .option('-p --passphrase <passphrase>', 'passphrase of the environment')
  .option('-e --environment <name>', 'Deployment environment name')
  .option('-c --cwd <path>', 'Base nx path')
  .action(
    prepareAction(async function (options: any) {
      options = await validateSchema(encryptSchema, options);

      const currentDir = get(options, 'cwd') || shell.pwd().toString();

      const environmentEncrypted = fastGlob.sync(
        [`**/.env.${options.environment}.gpg`],
        {
          cwd: currentDir,
          dot: true,
        }
      );

      const changedEnvs = [];

      for (const environmentEncryptedPath of environmentEncrypted) {
        console.log('\nProcessing\n', environmentEncryptedPath);

        const fullEnvPath = path.join(
          currentDir,
          environmentEncryptedPath as string
        );

        const decryptedEnvPath = replace(fullEnvPath, '.gpg', '');

        const existingFile = `${decryptedEnvPath}_backup`;

        if (fs.existsSync(decryptedEnvPath)) {
          console.log('Moving creating backup file');
          fs.moveSync(decryptedEnvPath, existingFile, { overwrite: true });
        } else {
          console.log('Skipped', decryptedEnvPath);
          continue;
        }

        execCmd(
          `gpg --passphrase "${options.passphrase}" --quiet --yes --batch -o ${decryptedEnvPath} -d ${fullEnvPath}`
        );

        const hashExisting = await hasha.fromFile(existingFile, {
          algorithm: 'md5',
        });

        const hashDecrypted = await hasha.fromFile(decryptedEnvPath, {
          algorithm: 'md5',
        });

        if (hashExisting == hashDecrypted) {
          console.log('Both hash are matching');
        } else {
          console.log('Has Changes', existingFile);
          changedEnvs.push(decryptedEnvPath);
        }

        if (fs.existsSync(existingFile)) {
          fs.moveSync(existingFile, decryptedEnvPath, { overwrite: true });
        }
      }

      for (const environmentEncryptedPath of changedEnvs) {
        console.log('\nProcessing\n', environmentEncryptedPath);

        const decryptedEnvPath = replace(environmentEncryptedPath, '.gpg', '');

        if (!fs.existsSync(decryptedEnvPath)) {
          console.log('Skipped', decryptedEnvPath);
          continue;
        }

        execCmd(
          `gpg --passphrase "${options.passphrase}" --quiet --yes --batch -c "${decryptedEnvPath}"`
        );

        console.log('Completed encrypt');
      }
    })
  );
