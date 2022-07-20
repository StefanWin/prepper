import {readAsString} from '../util';
import {EnvironmentConfig, EnvLine, isEnvLine, RequiredConfig} from './interface';
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

const transformArgs = (config: EnvironmentConfig): RequiredConfig[] => {
	const baseOptions = {
		strict: config.baseConfig.strict ?? true,
		exampleFilename: config.baseConfig.exampleFilename ?? '.env.example',
		copy: config.baseConfig.copy ?? true,
		overwrite: config.baseConfig.overwrite ?? false,
	};

	return config.environments.map(cfg => (<RequiredConfig>{
		...baseOptions,
		...cfg,
	}));
};

const check = (env: RequiredConfig) => {
	const absBasePath = path.join(process.cwd(), env.basePath);
	console.log(`checking environment files in: ${absBasePath}`);

	const envPath = path.join(absBasePath, '.env');
	const envExamplePath = path.join(absBasePath, env.exampleFilename);

	const envExampleExists = fs.existsSync(envExamplePath);
	const envExists = fs.existsSync(envPath);

	if (envExampleExists) {
		if (envExists) {
			const envExampleData = readAsString(envExamplePath);
			const exampleLines = envExampleData
				.split('\n')
				.filter(l => l !== '' && !l.startsWith('#'))
				.map(l => l.trim());

			const exampleKeyValues = exampleLines.map(l => {
				const [key, value] = l.split('=');
				return {key, value};
			}).filter(isEnvLine);

			const envData = readAsString(envPath);
			const envLines = envData
				.split('\n')
				.filter(l => l !== '' && !l.startsWith('#'))
				.map(l => l.trim());

			const envKeyValues = envLines.map(l => {
				const [key, value] = l.split('=');
				return {key, value};
			}).filter(isEnvLine);

			const diff = _.differenceWith<EnvLine, EnvLine>(exampleKeyValues, envKeyValues, (e1, e2): boolean => e1.key === e2.key);

			for (const d of diff) {
				console.warn(`key: ${d.key} not found in ${envPath}`);
				process.exit(-1);
			}
		} else if (env.copy) {
			fs.copySync(envExamplePath, envPath, {
				overwrite: true,
			});
		}
	}
};

export const checkEnvironment = (config: EnvironmentConfig) => {
	const environments = transformArgs(config);
	for (const env of environments) {
		check(env);
	}
};

export * from './interface';
