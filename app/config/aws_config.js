module.exports = function() {
    const config = {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }

    if (process.env.ENV === 'dev') {
        config.endPoint = process.env.ENDPOINT;
    }

    return config;
}