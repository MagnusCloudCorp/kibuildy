const path = require('path');

const glob = require('glob');
const Mocha = require('mocha');

function testProject(cwd) {

    // Instantiate a Mocha instance.
    var mocha = new Mocha({
        useColors: true,
        fullTrace: true,
        timeout: 30000
    });

    var testDir = path.join(cwd, 'dist/test');

    return getListOfFiles('dist/test/**/*.spec.js')
        .then(files => files
            .forEach(file => mocha
                .addFile(path.join(file))))
        .then(_ => runMocha(mocha));

}



function runMocha(mocha) {
    return new Promise((resolve, reject) => {
        mocha.run((failures) => {
            if (!failures) {
                resolve();
            } else {
                reject(failures);
                process.exit(1);
            }
        });
    });
}

function getListOfFiles(globPath, exclude) {
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



testProject(process.cwd()).then(val => '');