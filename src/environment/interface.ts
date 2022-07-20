export interface EnvFileBaseConfig {
  strict?: boolean
  exampleFilename?: string
  copy?: boolean
  overwrite?: boolean
}

export interface EnvFileConfig extends EnvFileBaseConfig {
  basePath: string
  exampleFilename?: string
}

export interface EnvironmentConfig {
  baseConfig: EnvFileBaseConfig
  environments: EnvFileConfig[]
}

export type RequiredConfig = Required<EnvFileBaseConfig> & Required<EnvFileConfig>;

export type EnvLine = {
  key: string
  value: string
}

export const isEnvLine = (k: any): k is EnvLine => {
	const el = k as EnvLine;
	return el.key !== undefined && el.value !== undefined;
};
