
import path from 'path';
import {parse} from 'ts-command-line-args';
import {ICommandLineArgs} from './cli';
import fs from 'fs-extra';
import {PrepperConfig} from './config';
import {checkEnvironment} from './environment';
import {checkDependencies} from './dependencies';

export const cliArgs = parse<ICommandLineArgs>({
	config: {
		type: String,
		alias: 'c',
		defaultValue: './.prepper.json',
		defaultOption: true,
		description: 'path to the configuration file',
		typeLabel: 'path',
	},
	help: {
		type: Boolean,
		optional: true,
		alias: 'h',
		description: 'Prints this usage guide',
	},
}, {
	helpArg: 'help',
	headerContentSections: [{header: 'prepper', content: 'v0.0.1'}],
});

const configPath = path.join(process.cwd(), cliArgs.config);
console.log(`loading configuration from: ${configPath}`);

if (!fs.existsSync(configPath)) {
	console.error(`configuration file: ${cliArgs.config} not found!`);
	process.exit(-1);
}

const configData = fs.readFileSync(configPath, {encoding: 'utf-8'});
const config = JSON.parse(configData) as PrepperConfig;

checkEnvironment(config.environments);
checkDependencies(config.dependencies);
