import fs from 'fs-extra';
export const stringify = (s: any) => console.log(JSON.stringify(s, null, 2));
export const readAsString = (path: string): string => fs.readFileSync(path, {encoding: 'utf-8'});
