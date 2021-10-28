import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/next';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { NxAdminGeneratorSchema } from './schema';

interface NormalizedSchema extends NxAdminGeneratorSchema {
  projectRoot: string;
}

function normalizeOptions(
  tree: Tree,
  options: NxAdminGeneratorSchema
): NormalizedSchema {
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${options.name}`;

  return {
    ...options,
    projectRoot,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  tree.delete(`${options.projectRoot}/pages/_app.tsx`);
  tree.delete(`${options.projectRoot}/pages/_document.tsx`);
  tree.delete(`${options.projectRoot}/pages/index.tsx`);
  tree.rename(`${options.projectRoot}/pages`, `${options.projectRoot}/src`);

  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

function updateDependencies(host: Tree) {
  updateJson(host, 'package.json', (json) => {
    if (json.dependencies && json.dependencies['@nrwl/gatsby']) {
      delete json.dependencies['@nrwl/gatsby'];
    }
    return json;
  });

  return addDependenciesToPackageJson(
    host,
    {
      '@fluentui/react': '^8.36.5',
      '@fluentui/react-hooks': '^8.3.4',
      '@fluentui/theme': '^2.4.1',
      '@hookform/resolvers': '^2.8.2',
      urql: '^2.0.5',
      yup: '^0.32.11',
      graphql: '^15.6.1',
      '@raftlabs/hbp-react': 'latest',
      '@raftlabs/hbp-sdk': 'latest',
      '@raftlabs/hasura-react': 'latest',
    },
    {}
  );
}

export default async function (tree: Tree, options: NxAdminGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  const tasks: GeneratorCallback[] = [];
  const updatePackage = await updateDependencies(tree);
  tasks.push(updatePackage);
  const nextTask = await applicationGenerator(tree, {
    ...options,
  });
  tasks.push(nextTask);
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
  return runTasksInSerial(...tasks);
}
