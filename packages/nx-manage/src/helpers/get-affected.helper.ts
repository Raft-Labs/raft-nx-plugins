import fs from 'fs';
import yaml from 'js-yaml';
import { get, intersection, keys } from 'lodash';
import { getAffectedGraph } from './get-affected-graph.helper';

export const getAffected = (inputComposeFile: string) => {
  const { affectedGraph } = getAffectedGraph();

  const affectedProjects = get(affectedGraph, 'projects');

  const composeJson: any = yaml.load(fs.readFileSync(inputComposeFile, 'utf8'));

  const composeServicesObj = get(composeJson, 'services');

  const composeVolumesObj = get(composeJson, 'volumes');

  const composeServices = keys(composeServicesObj);

  const affectedServices = intersection(composeServices, affectedProjects);

  return {
    affectedServices,
    composeVolumesObj,
    composeServicesObj,
    composeServices,
    composeJson,
  };
};
