#!/usr/bin/env node

import { createCli } from '../../src/index';

import { TestCommand } from './commands';

createCli([TestCommand], '', null, 'testrc');
