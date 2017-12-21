import { Options } from 'yargs';
import { Question } from 'inquirer';


export interface CommadArgs {
    command: string;
    description: string;
    alias?: string;
    options?: { [key: string]: Options };
    questions?: Question[]
}
