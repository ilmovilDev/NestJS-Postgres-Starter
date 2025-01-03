import { InternalServerErrorException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

type AppConfig = {
  appPort: number;
  nodeEnv: string;

  // Database
  dbPort: number;
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;

  // Swagger
  docTitle: string;
  docDescription: string;
  docVersion: string;
};

export default registerAs('app', (): AppConfig => {
  // Helper to parse and validate environment variables
  const getEnv = <T>(key: string, defaultValue?: T): T => {
    const value = process.env[key];
    if (value === undefined || value === null) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new InternalServerErrorException(
        `Missing required environment variable: ${key}. Please check your configuration.`,
      );
    }
    return value as T;
  };

  return {
    // Application
    appPort: Number(getEnv('APP_PORT')),
    nodeEnv: getEnv<string>('NODE_ENV', 'development'),

    // Database
    dbPort: Number(getEnv('DB_PORT', 5432)),
    dbHost: getEnv<string>('DB_HOST', 'localhost'),
    dbName: getEnv<string>('DB_NAME', 'TestDB'),
    dbUser: getEnv<string>('DB_USER'),
    dbPassword: getEnv<string>('DB_PASSWORD'),

    // Swagger
    docTitle: getEnv<string>('SWAGGER_DOC_TITLE', 'API Documentation'),
    docDescription: getEnv<string>('SWAGGER_DOC_DESCRIPTION', 'API Description'),
    docVersion: getEnv<string>('SWAGGER_DOC_VERSION', '1.0')

    // Add rest of environment variables
  };
});
