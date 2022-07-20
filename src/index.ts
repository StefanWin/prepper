
import path from 'path';
import fs from 'fs-extra';
import {PrepperConfig} from './config';
import {checkEnvironment} from './environment';
import {checkDependencies} from './dependencies';
import {log} from './util';
import {ICommandLineArgs} from './cli';

export const start = (cliArgs: ICommandLineArgs) => {
	const configPath = path.join(process.cwd(), cliArgs.config);
	log(`loading configuration from: ${configPath}`);

	if (!fs.existsSync(configPath)) {
		log(`configuration file: ${cliArgs.config} not found!`);
		process.exit(-1);
	}

	const configData = fs.readFileSync(configPath, {encoding: 'utf-8'});
	const config = JSON.parse(configData) as PrepperConfig;

	checkEnvironment(config.environments);
	checkDependencies(config.dependencies);
};

