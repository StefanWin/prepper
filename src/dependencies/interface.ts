export interface DependencyBaseConfig {

}

export interface DependencyConfig extends DependencyBaseConfig {

}

export interface DependenciesConfig {
  baseConfig: DependencyBaseConfig
  dependencies: DependencyConfig[]
}
