import shell from 'shelljs';
import { StringFormat } from '../../../hbp-sdk/src/lib/utils';

export class CommandException extends Error {
  commandSTDException: string;

  constructor(readonly commandOut: shell.ShellString, command: string) {
    super(`Command exited with nonzero out: ${command}`);
    this.commandSTDException = commandOut.stderr;
  }
}

export const execCmd = (
  command: StringFormat,
  options?: shell.ExecOptions & { async?: false | undefined }
) => {
  let commandOut;

  if (options) {
    commandOut = shell.exec(command, options);
  } else {
    commandOut = shell.exec(command);
  }

  if (commandOut.code != 0) {
    throw new CommandException(commandOut, command);
  }

  return commandOut;
};
