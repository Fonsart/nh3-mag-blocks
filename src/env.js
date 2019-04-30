const envConfig = require(`./env/${process.env.NODE_ENV}.json`);
envConfig.name = process.env.NODE_ENV;
export const ENV = envConfig;
