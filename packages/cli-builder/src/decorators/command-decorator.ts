import { CommadArgs } from './args';
import { CommandMetadata} from '../model/index';
import { getMetadataStorage } from '../metadata/metadata-storage';


export function Command(args: CommadArgs) {
    return function (object: Function) {
        const metadata = {} as CommandMetadata;
        metadata.clazz = object;
        metadata.args = args;
        getMetadataStorage().addCommand(metadata);
    };
}
