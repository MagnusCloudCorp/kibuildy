// tslint:disable:no-unused-expression
import 'reflect-metadata';

import { expect } from 'chai';

import * as yargs from 'yargs';

import { execTask } from '@kibuildy/utils';
import * as path from 'path';

describe('Kibuildy Cli builder', () => {




    it('should execute test with no problem', async () => {
        await execTask('node', [path.join(__dirname, 'test-cmd/cli.js'), 'test'])
    });


});
