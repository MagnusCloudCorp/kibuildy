import * as cp from 'child_process';
import * as path from 'path';

const resolveBin = require('resolve-bin');


/** Options that can be passed to execTask or execNodeTask. */
export interface ExecTaskOptions {
    // Whether to output to STDERR and STDOUT.
    silent?: boolean;
    // If an error happens, this will replace the standard error.
    errMessage?: string;
}

/** Create a task that executes a binary as if from the command line. */
export function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}) {
    return new Promise((resolve, reject) => {
        const childProcess = cp.spawn(binPath, args);

        if (!options.silent) {
            childProcess.stdout.on('data', (data: string) => {
                process.stdout.write(data);
            });

            childProcess.stderr.on('data', (data: string) => {
                process.stderr.write(data);
            });
        }

        childProcess.on('close', (code: number) => {
            if (code != 0) {

                if (options.errMessage === undefined) {
                    reject('Process failed with code ' + code);
                } else {
                    reject(options.errMessage);
                }
            } else {
                resolve();
            }
        });
    });
}

/**
 * Create a task that executes an NPM Bin, by resolving the binary path then executing it. These are
 * binaries that are normally in the `./node_modules/.bin` directory, but their name might differ
 * from the package. Examples are typescript, ngc and gulp itself.
 */
export function execNodeTask(packageName: string, executable: string | string[], args?: string[],
    options: ExecTaskOptions = {}) {
    if (!args) {
        args = <string[]>executable;
        executable = undefined;
    }

    return new Promise((resolve, reject) => {
        resolveBin(packageName, { executable: executable }, (err: any, binPath: string) => {
            if (err) {
                reject(err);
            } else {
                // Execute the node binary within a new child process using spawn.
                // The binary needs to be `node` because
                // on Windows the shell cannot determine the correct
                // interpreter from the shebang.
                execTask('node', [binPath].concat(args), options)
                    .then(_ => {

                        resolve();
                    });
            }
        });
    });
}




export function exec(command: string, args: string[], options = {},
    base: (command: string) => string = fromNpm): Promise<string> {
    return new Promise((resolve, reject) => {
        cp.exec(base(command) + ' ' + args.join(' '), options, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }

            resolve(stdout.toString());
        });
    });
}


export function fromNpm(command: string) {
    return path.normalize(`./node_modules/.bin/${command}`);
}


export function cmd(command: string, args: string[], options = {}): Promise<string> {
    return exec(command, args, options, (c: string) => command);
}

export function git(args: string[], options = {}): Promise<string> {
    return exec('git', args, options, (command: string) => command);
}
