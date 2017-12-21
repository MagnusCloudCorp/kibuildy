
import { ReflectiveInjector, Provider } from 'injection-js';
import { Logger } from '@kibuildy/utils';
import * as yargs from 'yargs';
import { CommandModule, Argv, Arguments, Options } from 'yargs';
import { prompt } from 'inquirer';
import { getMetadataStorage } from '../metadata/metadata-storage';
import { InjectionToken } from 'injection-js';
import { CliConfig } from '../model/index';



// TODO: REMOVE HAS_CONFIG_FILE and make LOCAL_CONFIG Optionnal
export const LOCAL_CONFIG = new InjectionToken('KIBUILDY:LOCAL_CONFIG');
export const HAS_CONFIG_FILE = new InjectionToken('KIBUILDY:HAS_CONFIG_FILE');


export function createCli(
    commands: any[],
    cliVersion: string,
    providers?: Provider[],
    configFile?: any,
    cliConfig?: CliConfig) {

    const findUp = require('find-up')
    const fs = require('fs')
    const configPath = findUp.sync([configFile + '.json'])
    const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};
    const hasConfigFile = !!configPath;
    if (hasConfigFile) {
        Logger.info('FOUND CONFIG FILE');
    }

    require('yargonaut')
        .style('blue')
        .style('yellow', 'required')
        .helpStyle('green')
        .errorsStyle('red');

    let argv = yargs
        .usage('Usage: $0 <command> [options]')
        .config(config);

    if (cliConfig) {
        if (cliConfig.envVarPrefix) {
            argv = argv.env(cliConfig.envVarPrefix);
        }
        if (cliConfig.globalOptions) {
            argv = argv.options(cliConfig.globalOptions);
        }
    }

    const injector = ReflectiveInjector.resolveAndCreate([
        providers ? [...providers] : [],
        ...commands,
        { provide: LOCAL_CONFIG, useValue: config },
        { provide: HAS_CONFIG_FILE, useValue: hasConfigFile }
    ]);


    commands.reduce((_argv, cmdClass) => {
        let cmd: CommandModule = injector.get(cmdClass);

        let { args } = getMetadataStorage().getCommadByClass(cmdClass);

        _argv.command(args.command,
            args.description as string,
            // builder
            (_args: Argv) => {

                if (args.options) {
                    Object.keys(args.options).forEach(key => {
                        _args.option(key, args.options[key])
                    })
                }
                return _args;
            },
            async (_args: Arguments) => {
                let answers;
                if (args.questions) {
                    answers = await prompt(args.questions);
                }

                try {
                    await (cmd.handler as any)(_args, answers);
                } catch (err) {
                    Logger.error(err.message);
                    process.exit(1);
                }

            });
        return _argv;
    }, argv);


    const args = argv.demandCommand(1)
        .version(() => cliVersion)
        .alias('v', 'version')
        .help('h')
        .alias('h', 'help')
        .argv;




}
