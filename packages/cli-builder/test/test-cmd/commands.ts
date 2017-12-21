import { Command, ICommand } from '../../src';
import { Logger } from '@kibuildy/utils';


@Command({
    command: 'test',
    description: '',
})
export class TestCommand implements ICommand {



    async handler(args: any, answers: any): Promise<any> {

        console.log(args);
        Logger.info('inside test command');
        return Promise.resolve(true)
    }



}
