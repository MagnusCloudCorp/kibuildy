
import * as fs from 'fs';
import * as glob from 'glob';
import * as fsExtra from 'fs-extra';
import * as rimraf from 'rimraf';

/**
 * Reads a JSON file.
 *
 * @param file Source file name.
 */
export const readJson = (file: string): Promise<any> =>
    readFile(file)
        .then((content: string) => Promise.resolve(JSON.parse(content)));


/**
 * Writes a JSON file.
 *
 * @param object Object literal that is stringified.
 * @param file Target file name.
 */
export const writeJson = (object: any, file: string): Promise<any> =>
    writeFile(file, JSON.stringify(object, undefined, 2));




export function copy(target: string, destination: string) {
    return fsExtra.copySync(target, destination);
}

export function remove(target: string) {
    return fsExtra.removeSync(target);
}



export function promiseify(fn: any) {
    return (...args: any[]) => {
        // const args = [].slice.call(arguments, 0);
        return new Promise((resolve, reject) => {
            fn.apply(this, args.concat([(err: any, value: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            }]));
        });
    };
}

export const readFile = promiseify(fs.readFile);
export const writeFile = promiseify(fs.writeFile);


export function mkdir(target: string) {
    return fs.mkdirSync(target);
}

export function rmdir(target: string) {
    return fs.rmdirSync(target);
}

export function getListOfFiles(globPath: string, exclude?: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const options = exclude ? { ignore: exclude } : {};

        glob(globPath, options, (error, matches) => {
            if (error) {
                return reject(error);
            }

            resolve(matches);
        });
    });
}

export function removeRecursively(globPath: string) {
    return new Promise((resolve, reject) => {
        rimraf(globPath, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
