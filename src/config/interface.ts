import {DependenciesConfig} from '../dependencies';
import {EnvironmentConfig} from '../environment';

export interface PrepperConfig {
  environments: EnvironmentConfig
  dependencies: DependenciesConfig
}
