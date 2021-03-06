/**
 * This file has been copied from workspace/src/command-line/output
 * Consider that file to be the golden source. Changes (which should be few)
 * should be copied here if necessary.
 */
const chalk = require('chalk');

/**
 * Automatically disable styling applied by chalk if CI=true
 */
if (process.env.CI === 'true') {
	chalk.Level = 0;
}

class CLIOutput {
	REACT_COMMAND_PREFIX = `${chalk.cyan('>')} ${chalk.reset.inverse.bold.cyan(
		' REACT_COMMAND '
	)}`;
	/**
	 * Longer dash character which forms more of a continuous line when place side to side
	 * with itself, unlike the standard dash character
	 */
	VERTICAL_SEPARATOR = '———————————————————————————————————————————————';

	/**
	 * Expose some color and other utility functions so that other parts of the codebase that need
	 * more fine-grained control of message bodies are still using a centralized
	 * implementation.
	 */
	colors = {
		gray: chalk.gray
	};
	bold = chalk.bold;
	underline = chalk.underline;

	writeToStdOut(str) {
		process.stdout.write(str);
	}

	writeOutputTitle({ label, title }) {
		let outputTitle;
		if (label) {
			outputTitle = `${this.REACT_COMMAND_PREFIX} ${label} ${title}\n`;
		} else {
			outputTitle = `${this.REACT_COMMAND_PREFIX} ${title}\n`;
		}
		this.writeToStdOut(outputTitle);
	}

	writeOptionalOutputBody(bodyLines) {
		if (!bodyLines) {
			return;
		}
		this.addNewline();
		bodyLines.forEach(bodyLine => this.writeToStdOut(`  ${bodyLine}\n`));
	}

	addNewline() {
		this.writeToStdOut('\n');
	}

	addVerticalSeparator() {
		this.writeToStdOut(`\n${chalk.gray(this.VERTICAL_SEPARATOR)}\n\n`);
	}

	error({ title, slug, bodyLines }) {
		this.addNewline();

		this.writeOutputTitle({
			label: chalk.reset.inverse.bold.red(' ERROR '),
			title: chalk.bold.red(title)
		});

		this.writeOptionalOutputBody(bodyLines);

		/**
		 * Optional slug to be used in an REACT COMMAND error message redirect URL
		 */
		if (slug && typeof slug === 'string') {
			this.addNewline();
			this.writeToStdOut(
				`${chalk.grey(
					'  Learn more about this error: '
				)}https://github.com/${slug}\n`
			);
		}

		this.addNewline();
	}

	warn({ title, slug, bodyLines }) {
		this.addNewline();

		this.writeOutputTitle({
			label: chalk.reset.inverse.bold.yellow(' WARNING '),
			title: chalk.bold.yellow(title)
		});

		this.writeOptionalOutputBody(bodyLines);

		/**
		 * Optional slug to be used in an Nx warning message redirect URL
		 */
		if (slug && typeof slug === 'string') {
			this.addNewline();
			this.writeToStdOut(
				`${chalk.grey(
					'  Learn more about this warning: '
				)}https://github.com/${slug}\n`
			);
		}

		this.addNewline();
	}

	note({ title, bodyLines }) {
		this.addNewline();

		this.writeOutputTitle({
			label: chalk.reset.inverse.bold.keyword('orange')(' NOTE '),
			title: chalk.bold.keyword('orange')(title)
		});

		this.writeOptionalOutputBody(bodyLines);

		this.addNewline();
	}

	success({ title }) {
		this.addNewline();

		this.writeOutputTitle({
			label: chalk.reset.inverse.bold.green(' SUCCESS '),
			title: chalk.bold.green(title)
		});

		this.addNewline();
	}

	logSingleLine(message) {
		this.addNewline();

		this.writeOutputTitle({
			title: message
		});

		this.addNewline();
	}

	log({ title, bodyLines }) {
		this.addNewline();

		this.writeOutputTitle({
			title: chalk.white(title)
		});

		this.writeOptionalOutputBody(bodyLines);

		this.addNewline();
	}
}

module.exports = new CLIOutput();
