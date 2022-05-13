export default () => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    mongo: {
        host: process.env.MONGO_HOST || "localhost",
        port: parseInt(process.env.MONGO_PORT, 10) || 27017
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT, 10) || 6379
    }
});