import { isEmpty } from 'lodash';
import semver from 'semver';
import { execCmd } from './exec.helper';

export const getAffectedGraph = () => {
  const nxVersion = execCmd(`nx --version`).stdout;

  let selectedCommand = `nx print-affected`;

  if (semver.gt('12.10.0', nxVersion)) {
    selectedCommand = `nx print-affected --base=${process.env.NX_BASE} --head=${process.env.NX_HEAD}`;
  }

  const affectedResponse = execCmd(selectedCommand, {
    silent: true,
  });

  if (!isEmpty(affectedResponse.stderr)) {
    throw new Error(affectedResponse.stderr);
  }
  const affectedGraph = JSON.parse(affectedResponse);

  return { affectedGraph };
};
