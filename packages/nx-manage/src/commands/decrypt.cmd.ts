import { createCommand } from 'commander';
import fastGlob from 'fast-glob';
import { get, replace } from 'lodash';
import path from 'path';
import shell from 'shelljs';
import { execCmd } from '../helpers/exec.helper';
import { prepareAction } from '../helpers/prepare-action.helper';
import { validateSchema } from '../helpers/validate-schema.helper';
import { decryptSchema } from '../validators/decrypt.validator';

export const decrypt = createCommand('decrypt');

decrypt
  .option('-p --passphrase <passphrase>', 'passphrase of the environment')
  .option('-e --environment <name>', 'Deployment environment name')
  .option('-c --cwd <path>', 'Base nx path')
  .action(
    prepareAction(async function (options: any) {
      options = await validateSchema(decryptSchema, options);

      const currentDir = get(options, 'cwd') || shell.pwd().toString();

      const environmentEncrypted = fastGlob.sync(
        [`**/.env.${options.environment}.gpg`],
        {
          cwd: currentDir,
          dot: true,
        }
      );

      for (const environmentEncryptedPath of environmentEncrypted) {
        console.log('\nProcessing\n', environmentEncryptedPath);

        const fullEnvPath = path.join(
          currentDir,
          environmentEncryptedPath as string
        );

        const decryptedEnvPath = replace(fullEnvPath, '.gpg', '');

        execCmd(
          `gpg --passphrase "${options.passphrase}" --quiet --yes --batch -o "${decryptedEnvPath}" -d "${fullEnvPath}"`
        );
      }
    })
  );
