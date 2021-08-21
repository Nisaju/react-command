#!/usr/bin/env node

/**
 * react-command
 * Generate React File with ease
 *
 * @author anjianto <github.com/anjianto>
 */

const path = require('path');
const fs = require('fs');

const pascalcase = require('pascalcase');
const shell = require('shelljs');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const output = require('./utils/output');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	const packageJson = JSON.parse(
		fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
	);

	const react = packageJson?.dependencies?.react && 'react';
	const next = packageJson?.dependencies?.next && 'next';

	if (!(react || next)) {
		output.error({
			title: 'This CLi only can be use inside React or Next.js Project.'
		});
	}

	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	input.includes(`--help`) && cli.showHelp(1);
	input.includes(`-h`) && cli.showHelp(2);

	const name = flags.name || flags.n || null;
	const extension = flags.extension || flags.e || null;
	const page = flags.page;
	const root = flags.root || flags.r || undefined;

	if (!['js', 'jsx', 'ts', 'tsx'].includes(extension)) {
		output.error({
			title: 'Extension only can be "js" | "jsx" | "ts" | "tsx"'
		});
	}

	if (!name) {
		output.error({
			title: 'GIVE ME NAME!!!'
		});
	}

	const folder = extension === ('ts' || 'tsx') ? 'ts' : 'js';

	const filepath = path.join(
		root ?? '',
		flags.page || flags.p ? 'pages' : 'components',
		flags.parent ? pascalcase(name) : null,
		`${pascalcase(name)}.${extension}`
	);

	const templateFilepath = path.join(
		process.cwd(),
		'templates',
		page ? 'pages' : 'components',
		folder,
		`${next || react}.${extension}`
	);

	if (fs.existsSync(filepath) && !(flags.force || flags.f)) {
		output.error({
			title: `Duplicate File ${filepath}`
		});
		process.exit(1);
	}

	const file = fs
		.readFileSync(templateFilepath, 'utf8')
		.replace(/__NAME__/g, pascalcase(name));

	if (flags.parent) {
		const r = root ? `${root}/` : '';

		if (!(flags.page || flags.p)) {
			shell.mkdir('-p', `${r}components/${pascalcase(name)}`);
		} else {
			shell.mkdir('-p', `${r}pages/${pascalcase(name)}`);
		}
	}

	fs.writeFileSync(filepath, file, {
		encoding: 'utf8'
	});

	debug && log(flags);
})();
