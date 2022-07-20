import fs from 'fs-extra';

/**
 * Read the given file as a string in utf-8 encoding.
 * Does not check for the files existence.
 * @param path the file to read
 * @returns the contents of the file as string.
 */
export const readAsString = (path: string): string => fs.readFileSync(path, {encoding: 'utf-8'});

// eslint-disable-next-line no-console
export const log = (msg: string): void => console.log(`prepper - ${msg}`);
