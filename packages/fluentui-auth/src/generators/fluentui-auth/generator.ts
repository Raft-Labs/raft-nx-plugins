import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getProjects,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { FluentUiAuthGeneratorSchema } from './schema';

interface NormalizedSchema extends FluentUiAuthGeneratorSchema {
  projectRoot: string;
}

function normalizeOptions(
  tree: Tree,
  options: FluentUiAuthGeneratorSchema
): NormalizedSchema {
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}`;

  return {
    ...options,
    projectRoot,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names('fluentui-auth'),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  const project = getProjects(tree).get(options.project);
  const targetPath = path.join(project.sourceRoot);
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    targetPath,
    templateOptions
  );
}

export default async function (
  tree: Tree,
  options: FluentUiAuthGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, 'fluentui-auth', {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@raftlabs/fluentui-auth:build',
      },
    },
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
