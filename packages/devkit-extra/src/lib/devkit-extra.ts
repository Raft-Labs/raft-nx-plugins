import { getWorkspaceLayout, readJson, Tree, writeJson } from '@nrwl/devkit';
import * as fs from 'fs-extra';
import { defaultsDeep, get, values } from 'lodash';
import * as path from 'path';

export type WorkspaceLayout = ReturnType<typeof getWorkspaceLayout>;

interface WorkspaceLayoutExtra extends WorkspaceLayout {
  servicesDir: string;
}

export function getWorkspaceLayoutExtra(tree: Tree): WorkspaceLayoutExtra {
  const layoutData = getWorkspaceLayout(tree);

  const workspaceObj = readJson(tree, 'nx.json');

  return {
    ...layoutData,
    servicesDir: get(workspaceObj, 'workspaceLayout.servicesDir', 'services'),
  };
}

export interface InputUpdateWorkspaceLayoutExtra {
  appsDir?: string;
  libsDir?: string;
  servicesDir?: string;
}

export function updateWorkspaceLayoutExtra(
  tree: Tree,
  workspaceLayout?: InputUpdateWorkspaceLayoutExtra
) {
  const workspaceObj = readJson(tree, 'nx.json');

  const workspaceObjNew = defaultsDeep(
    workspaceObj,
    {
      workspaceLayout: { servicesDir: 'services' },
    },
    {
      workspaceLayout,
    }
  );
  const ensureFolders = values(get(workspaceObjNew, 'workspaceLayout'));

  for (const folderPath of ensureFolders) {
    fs.ensureDirSync(path.join(tree.root, folderPath));
  }

  writeJson(tree, 'nx.json', workspaceObjNew);
}
