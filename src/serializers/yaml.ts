import * as jsyaml from 'js-yaml';
import { Pipeline, SerializationOptions } from '../';
import { Serializer } from '.';
import { JsonSerializer } from './json';

export class YamlSerializer implements Serializer<string> {
    private readonly jsonSerializer: Serializer<string | object>;

    constructor(opts: SerializationOptions = {}) {
        this.jsonSerializer = new JsonSerializer({ ...opts, stringify: false });
    }

    async serialize(e: Pipeline): Promise<string> {
        return jsyaml.safeDump(await this.jsonSerializer.serialize(e), {
            skipInvalid: true,
            noRefs: true,
            styles: {
                '!!null': 'canonical', // dump null as ~
            },
        });
    }
}
