/**
 * Export an ENV object
 * The `config` property provide the content of the applicable JSON environment file
 * The `name` property contains the name of the current environment
 */
export const ENV = {
  config: require(`./env/${process.env.NODE_ENV}.json`),
  name: process.env.NODE_ENV
};
