export class PosterException extends Error {
    constructor(public readonly code: number, public readonly message: string, originArg?: string) {
        super(originArg);
    }
}

const errors = {
    CANT_CREATE_CHECK: {
        code: 555,
        message: `Something went wrong during check commiting.`,
    },
};
