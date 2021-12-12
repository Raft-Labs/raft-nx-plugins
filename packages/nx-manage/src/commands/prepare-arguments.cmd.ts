import { createCommand } from 'commander';
import { difference, flatten, get, isEmpty } from 'lodash';
import { getAffectedGraph } from '../helpers/get-affected-graph.helper';
import { prepareAction } from '../helpers/prepare-action.helper';
import { validateSchema } from '../helpers/validate-schema.helper';
import { prepareArgumentSchema } from '../validators/prepare-arguments.validator';

export const prepareArguments = createCommand('prepare-arguments');

prepareArguments
  .option('-p --include-pattern <pattern...>', 'Pattern to check')
  .option('-e --exclude-pattern <pattern...>', 'Pattern to check')
  .option('-r --exclude', 'The output is for excluding')
  .option('-i --include', 'The output is for including')
  .option('-g --github', 'Add output tags of github')
  .option('-a --no-affected', 'Not pick projects from affected')
  .action(
    prepareAction(async function (options: any) {
      options = await validateSchema(prepareArgumentSchema, options);

      const includePattern = get(options, 'includePattern');
      const excludePattern = get(options, 'excludePattern');

      if (get(options, 'affected')) {
        const { affectedGraph } = getAffectedGraph();
        const affectedProjects: Array<string> = get(affectedGraph, 'projects');

        const selected = [];

        if (!isEmpty(includePattern)) {
          for (const pattern of includePattern) {
            const ValidationExpression = RegExp(pattern);

            const affectedApps = affectedProjects.filter((project) =>
              ValidationExpression.test(project)
            );
            selected.push(affectedApps);
          }
        }

        if (!isEmpty(excludePattern)) {
          let selectedExclude = affectedProjects;

          for (const pattern of excludePattern) {
            const ValidationExpression = RegExp(pattern);

            const affectedApps = selectedExclude.filter(
              (project) => !ValidationExpression.test(project)
            );
            selectedExclude = affectedApps;
          }

          selected.push(selectedExclude);
        }

        const mergedProjects = flatten(selected);

        if (get(options, 'exclude')) {
          const excludeResult = difference(
            affectedProjects,
            mergedProjects
          ).join(',');

          if (get(options, 'github')) {
            console.log(`::set-output name=exclude::${excludeResult}`);
          } else {
            console.log(excludeResult);
          }
        }

        if (get(options, 'include')) {
          const includeResult = mergedProjects.join(',');

          if (get(options, 'github')) {
            console.log(`::set-output name=include::${includeResult}`);
          } else {
            console.log(includeResult);
          }
        }
      }
    })
  );
