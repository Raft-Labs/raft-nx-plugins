import { createCommand } from 'commander';
import { get, isEmpty } from 'lodash';
import path from 'path';
import shell from 'shelljs';
import { createAffectedCompose } from '../helpers/create-affected-compose.helper';
import { execCmd } from '../helpers/exec.helper';
import { prepareAction } from '../helpers/prepare-action.helper';
import { validateSchema } from '../helpers/validate-schema.helper';
import { affectedServiceSchema } from '../validators/affected-services.validator';

export const affectedServices = createCommand('affected-services');

affectedServices
  .option('-f --compose-file <path>', 'Specify docker compose file path')
  .option(
    '-o --affected-compose-file <path>',
    'Specify docker compose file path to create new file'
  )
  .option('-p --project-name <name>', 'Specify project name')
  .option('-d --no-deploy', 'Prevent form running compose up')
  .option('-c --cwd <path>', 'Base nx path')
  .action(
    prepareAction(async function (options: any) {
      options = await validateSchema(affectedServiceSchema, options);

      const currentDir = get(options, 'cwd') || shell.pwd().toString();

      const inputFilePath = path.isAbsolute(get(options, 'composeFile'))
        ? get(options, 'composeFile')
        : path.join(currentDir, get(options, 'composeFile'));

      const workspaceFilePath = path.join(currentDir, 'workspace.json');

      const composeName = get(options, 'projectName');

      const outputFilePath =
        get(options, 'affectedComposeFile') ||
        path.join(currentDir, 'docker-compose.yml');

      const { affectedServices } = createAffectedCompose(
        inputFilePath,
        outputFilePath,
        workspaceFilePath
      );

      console.log('Created affected compose file');
      console.log(outputFilePath);

      if (options.deploy) {
        if (isEmpty(affectedServices)) {
          console.log('No services changed thus nothing to deploy');
          return;
        }

        console.log('Deploying services', affectedServices);

        execCmd(
          `COMPOSE_IGNORE_ORPHANS=true docker-compose -f "${outputFilePath}" -p "${composeName}" up -d`
        );
      }
    })
  );
