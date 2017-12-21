
import { CommandMetadata } from '../model/index';


export class MetadataStorage {


    commands: CommandMetadata[] = [];

    addCommand(cmd: CommandMetadata) {
        this.commands.push(cmd);
    }


    getCommadByClass(clazz: Function) {
        return this.commands.find(m => m.clazz === clazz);
    }



}



export function getMetadataStorage(): MetadataStorage {
    if (!(global as any).kibuildyMetadataStorage)
        (global as any).kibuildyMetadataStorage = new MetadataStorage();

    return (global as any).kibuildyMetadataStorage;
}
