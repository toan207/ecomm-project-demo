const morgan = require('morgan');
const chalk = require('chalk');

morgan.token('coloredStatus', (req, res) => {
    const status = res.statusCode;
  return status >= 500 ? chalk.red(status) : chalk.green(status);
});

const logger = morgan(
    ':method :url :coloredStatus :response-time ms - :res[content-length]',
    {
        stream: process.stdout,
    }
);

module.exports = logger;
