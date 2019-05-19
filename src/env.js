export const ENV = {
  config: require(`./env/${process.env.NODE_ENV}.json`),
  name: process.env.NODE_ENV
};
