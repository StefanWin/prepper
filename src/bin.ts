#!/usr/bin/env node
import {parse} from 'ts-command-line-args';
import {start} from '.';
import {ICommandLineArgs} from './cli';

const cliArgs = parse<ICommandLineArgs>({
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

start(cliArgs);
