import { BaseStep } from '../base';
import { Serializable } from '../index';

export class WaitStep implements BaseStep, Serializable {
    constructor(public continueOnFailure = false) {}

    toString(): string {
        /* istanbul ignore next */
        return this.continueOnFailure
            ? '[wait; continues on failure]'
            : '[wait]';
    }

    async toJson(): Promise<object> {
        /* eslint-disable @typescript-eslint/camelcase */
        return {
            wait: null,
            continue_on_failure: this.continueOnFailure || undefined,
        };
    }
}
