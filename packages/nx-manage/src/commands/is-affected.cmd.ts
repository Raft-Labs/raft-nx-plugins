import { createCommand } from 'commander';
import { get, has, isEmpty } from 'lodash';
import path from 'path';
import shell from 'shelljs';
import { getAffectedApps } from '../helpers/get-affected-apps.helper';
import { getAffected } from '../helpers/get-affected.helper';
import { prepareAction } from '../helpers/prepare-action.helper';
import { validateSchema } from '../helpers/validate-schema.helper';
import { IsAffectedSchema } from '../validators/is-affected.validator';

export const isAffected = createCommand('is-affected');

isAffected
  .option('-f --compose-file <path>', 'Specify docker compose file path')
  .option('-s --service', 'Check for service', false)
  .option('-a --apps', 'Check for apps', false)
  .option('-p --pattern <pattern>', 'Pattern to check apps')
  .option('-g --no-github', 'Remove output tags github')
  .option('-j --json', 'Output json')
  .option('-c --cwd <path>', 'Base nx path')
  .action(
    prepareAction(async function (options: any) {
      options = await validateSchema(IsAffectedSchema, options);

      let affected = {};

      if (options?.service) {
        const currentDir = options?.cwd || shell.pwd().toString();

        const inputFilePath = path.isAbsolute(options?.composeFile)
          ? options?.composeFile
          : path.join(currentDir, options?.composeFile);

        const { affectedServices } = getAffected(inputFilePath);

        let serviceMeta;

        if (!isEmpty(affectedServices)) {
          serviceMeta = { isAffectedServices: true, affectedServices };
        } else {
          serviceMeta = { isAffectedServices: false, affectedServices };
        }

        affected = { ...affected, ...serviceMeta };
      }

      if (options?.apps) {
        const { affectedApps } = getAffectedApps(options?.pattern);

        let serviceMeta;

        if (!isEmpty(affectedApps)) {
          serviceMeta = { isAffectedApps: true, affectedApps };
        } else {
          serviceMeta = { isAffectedApps: false, affectedApps };
        }

        affected = { ...affected, ...serviceMeta };
      }

      if (options?.github) {
        if (has(affected, 'isAffectedApps')) {
          console.log(
            `::set-output name=is-affected-apps::${get(
              affected,
              'isAffectedApps'
            )}`
          );
        }

        if (has(affected, 'isAffectedServices')) {
          console.log(
            `::set-output name=is-affected-services::${get(
              affected,
              'isAffectedServices'
            )}`
          );
        }
      }

      if (options?.json) {
        console.log(JSON.stringify(affected));
      }
    })
  );
