// tslint:disable:no-console
import chalk from 'chalk';




export class Logger {

    static error(err: string | Error): void {

        if (err instanceof Error) {
            console.log('\n' + chalk.red('BUILD ERROR'));
            console.log(chalk.red(err.message));
            console.log(chalk.red(err.stack) + '\n');
        } else {
            console.log(chalk.red(err));
        }

    };

    static warn(msg: string): void {
        console.log(chalk.yellow(msg));
    };

    static success(msg: string): void {
        console.log(chalk.green(msg));
    };

    static info(msg: string): void {
        console.log(chalk.blue(msg));
    };

    static debug(msg: string): void {

        if (process.env.DEBUG) {
            console.log(chalk.inverse.cyan(`[debug] ${msg}`));
        }

    };

}
