import { ResponseError, RunError } from '../types';

export default class SRCError extends Error {
	error: ResponseError | RunError;
	
	constructor(error: ResponseError | RunError) {
		super(SRCError.errToMessage(error))
		this.name = "SRCError";
		
		this.error = error;
	}

	static errToMessage(error: ResponseError | RunError) {
		return `[${error.status}] ${error.message} ${'errors' in error ? error.errors.map(e => `'${e}'`).join(', ') : ''}`
	}
}