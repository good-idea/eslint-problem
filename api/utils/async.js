// @flow

export const promiseSerial = (funcs: Array<Function>): Promise<Function> =>
	funcs.reduce((promise, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))
