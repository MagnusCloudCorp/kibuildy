
import { CommadArgs } from '../decorators/args';
import { Options } from 'yargs';


export class CommandMetadata {
    clazz: Function;
    args: CommadArgs;
}


export interface CliConfig {
    envVarPrefix?: string;
    globalOptions?: { [key: string]: Options }
}
