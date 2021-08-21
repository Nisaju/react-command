const path = require('path');
const fs = require('fs');

const pascalcase = require('pascalcase');

const generateIndexComponent = ({
	dir,
	page,
	folder,
	extension,
	name,
	flags,
	root
}) => {
	if (page) return;

	const templateRootFilepath = path.resolve(
		dir,
		path.join(
			'templates',
			'components',
			folder,
			`index.${extension === ('ts' || 'tsx') ? 'ts' : 'js'}`
		)
	);

	const dataRootFile = fs
		.readFileSync(templateRootFilepath, 'utf8')
		.replace(/__NAME__/g, pascalcase(name));

	const rootFilepath = path.join(
		root ?? '',
		'components',
		flags.parent ? pascalcase(name) : null,
		`index.${extension === ('ts' || 'tsx') ? 'ts' : 'js'}`
	);

	fs.writeFileSync(rootFilepath, dataRootFile, {
		encoding: 'utf8'
	});
};

module.exports = { generateIndexComponent };
