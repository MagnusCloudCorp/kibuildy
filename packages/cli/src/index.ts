import { Logger } from '@kibuildy/utils';

import { createCli } from '@kibuildy/cli-builder';
import { join } from 'path';
let config: any;

try {
    config = require(join(process.cwd(), 'kibuildy.js'));
    createCli(config.commands, config.version, config.providers);
} catch (e) {
    // file missing
    if (e.code === 'MODULE_NOT_FOUND') {
        Logger.error('File kibuildy-config.js not found in project ')
        throw e;
    }
    if (e.code !== 'MODULE_NOT_FOUND') {
        Logger.error('Error found in your kibuildy-config.js file')
        throw e;
    }
    process.exit(1);
}

