import { Argv } from "yargs";




export interface ICommand {


    handler: (args: any, answers: any) => Promise<any>;

}
