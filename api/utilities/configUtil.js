const Config = require('../../config');

exports.getConfigVariable = (variable) => {
    const nodeEnv = process.env.NODE_ENV;
    let value = '';
    switch (nodeEnv) {
    case process.env.PRODUCTION_ENV:
        value = process.env[variable];
        break;
    default:
        value = Config[variable];
        break;
    }
    return value;
};
