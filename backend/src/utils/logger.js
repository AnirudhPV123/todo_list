import { createLogger } from 'winston';
import { loggerConfig } from '../config/loggerConfig.js';

const logger = () => {
  return createLogger(
    loggerConfig[process.env.NODE_ENV === 'development' ? 'development' : 'production'],
  );
};

// Call the logger function to create an instance
const loggerInstance = logger();

// Export the logger instance
export { loggerInstance as logger };
