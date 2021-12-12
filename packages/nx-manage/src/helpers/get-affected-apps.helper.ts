import { get } from 'lodash';
import { getAffectedGraph } from './get-affected-graph.helper';

export const getAffectedApps = (pattern: string) => {
  const { affectedGraph } = getAffectedGraph();

  const affectedProjects: Array<string> = get(affectedGraph, 'projects');

  const ValidationExpression = RegExp(pattern);

  const affectedApps = affectedProjects.filter((project) =>
    ValidationExpression.test(project)
  );

  return { affectedApps };
};
