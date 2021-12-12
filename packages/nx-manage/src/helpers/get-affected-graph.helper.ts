import { isEmpty } from 'lodash';
import { execCmd } from './exec.helper';

export const getAffectedGraph = () => {
  const affectedResponse = execCmd('nx print-affected', {
    silent: true,
  });

  if (!isEmpty(affectedResponse.stderr)) {
    throw new Error(affectedResponse.stderr);
  }
  const affectedGraph = JSON.parse(affectedResponse);

  return { affectedGraph };
};
