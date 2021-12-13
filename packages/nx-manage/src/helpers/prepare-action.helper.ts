import { ValidationError } from 'joi';
import { get, map } from 'lodash';
import { CommandException } from './exec.helper';

export const prepareAction =
  (action: any) =>
  async (...option: any) => {
    try {
      return await action(...option);
    } catch (exception) {
      if (exception instanceof ValidationError) {
        map(get(exception, 'details'), ({ message }) => {
          console.log(message);
        });
      } else if (exception instanceof CommandException) {
        console.log(exception.message);
        console.log(exception.commandOut);
      } else {
        console.log(exception);
      }
    }
  };
