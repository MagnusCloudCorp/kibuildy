# Kibuildy

> means who builds, in arabic-english manner :)

Library for crafting CLIs with DI(injection-js), Annotation , Typescript nad based on yargs

## Getting started

MORE DOCS COMING SOON...


### install
```bash
npm install reflect-metadata @kibuildy/cli-builder --save
```

## Example

### test-cmd.ts
```typescript

import { Command, ICommand } from '@kibuildy/cli-builder';
import { Logger } from '@kibuildy/utils';


@Command({
    command: 'test-cmd',
    description: '',
})
export class TestCommand implements ICommand {

    async handler(args: any, answers: any): Promise<any> {
        console.log(args);
        Logger.info('inside test command');
        return Promise.resolve(true)
    }

}
```


### index.ts

```typescript
import { createCli } from '@kibuildy/cli-builder';
import { TestCommand } from './test-cmd';
createCli([TestCommand], '', null, 'testrc');
```


### bin file

```javascript
#!/usr/bin/env node

require('reflect-metadata');
require('../dist/index');

```
