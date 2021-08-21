const meow = require('meow');
const meowHelp = require('cli-meow-help');
const flags = {
	dryRun: {
		type: `boolean`,
		default: false,
		alias: `dry-run`,
		desc: `Show what file will be generate`
	},
	parent: {
		type: `boolean`,
		default: true,
		desc: `Generate file with the same name for folder`
	},
	name: {
		type: `string`,
		alias: 'n',
		desc: `Give the name for file`
	},
	parentName: {
		type: `string`,
		alias: 'pn',
		desc: `Custom name for parent file (folder)`
	},
	page: {
		type: `boolean`,
		alias: 'p',
		desc: `Generate page file`
	},
	root: {
		type: `string`,
		alias: 'r',
		desc: `set root for generate folder and file`
	},
	force: {
		type: `boolean`,
		alias: 'f',
		desc: `Always create file or folder --exists--`
	},
	extension: {
		type: `string`,
		alias: 'c',
		default: 'jsx',
		desc: `Generate file with the given extension`
	},
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	help: { desc: `Print help info` },
	'--help': { desc: `Print help info` },
	'-h': { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `rc`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
