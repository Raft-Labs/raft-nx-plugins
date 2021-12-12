import { program } from 'commander';
import { affectedServices } from './commands/affected-services.cmd';
import { decrypt } from './commands/decrypt.cmd';
import { encrypt } from './commands/encrypt.cmd';
import { isAffected } from './commands/is-affected.cmd';
import { prepareArguments } from './commands/prepare-arguments.cmd';

program.version('0.0.1');

program.addCommand(affectedServices);
program.addCommand(encrypt);
program.addCommand(decrypt);
program.addCommand(isAffected);
program.addCommand(prepareArguments);

program.parse(process.argv);
