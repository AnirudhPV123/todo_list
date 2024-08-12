import { format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level} ${timestamp} ${message}`;
});

const loggerConfig = {
  development: {
    format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), myFormat),
    transports: [new transports.File({ filename: 'siteErrorsDev.log' }), new transports.Console()],
  },
  production: {
    format: combine(timestamp(), myFormat),
    transports: [new transports.File({ filename: 'siteErrors.log' })],
  },
};

export { loggerConfig };
