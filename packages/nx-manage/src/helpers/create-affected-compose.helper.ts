import fs from 'fs-extra';
import yaml from 'js-yaml';
import {
  difference,
  flatten,
  get,
  intersection,
  isEmpty,
  keys,
  map,
  merge,
  omit,
  pick,
} from 'lodash';
import { exit } from 'process';
import { getAffected } from './get-affected.helper';

export function createAffectedCompose(
  inputComposeFile: string,
  outputComposeFile: string,
  workspaceFilePath: string
) {
  try {
    const {
      affectedServices,
      composeVolumesObj,
      composeServicesObj,
      composeJson,
      composeServices,
    } = getAffected(inputComposeFile);

    const newYaml = omit(composeJson, ['services', 'volumes']);

    const selectedServices = pick(composeServicesObj, affectedServices);

    if (!isEmpty(selectedServices)) {
      const workspaceObj = fs.readJSONSync(workspaceFilePath);
      const workspaceProjects = get(workspaceObj, 'projects');
      const workspaceProjectNames = keys(workspaceProjects);
      const affectingServices = intersection(
        workspaceProjectNames,
        composeServices
      );

      const nonAffectingServiceNames = difference(
        composeServices,
        affectingServices
      );

      const nonAffectingServices = pick(
        composeServicesObj,
        nonAffectingServiceNames
      );
      const combinedServices = merge(nonAffectingServices, selectedServices);
      newYaml.services = combinedServices;

      const selectedServicesVolumes = map(combinedServices, (service) => {
        const serviceVolumes = get(service, 'volumes');
        if (!isEmpty(serviceVolumes)) {
          return map(
            serviceVolumes,
            (volumeString: string) => volumeString.split(':')[0]
          );
        } else {
          return [];
        }
      });

      const selectedVolumeNames = flatten(selectedServicesVolumes);

      const selectedVolumes = pick(composeVolumesObj, selectedVolumeNames);

      if (!isEmpty(selectedVolumes)) newYaml.volumes = selectedVolumes;

      const composeYaml = yaml.dump(newYaml);

      fs.writeFileSync(outputComposeFile, composeYaml, { encoding: 'utf8' });
    }

    return { affectedServices, composeServices };
  } catch (e) {
    console.log(e);
    exit(1);
  }
}
