export const EnvConfiguration = () =>({
    environment:process.env.NODE_ENV || 'dev',
    MONGODB: process.env.MONGODB,
    port:process.env.PORT || 3002,
    defaultLimit:+process.env.DEFAULT_PAGINATION_LIMIT || 10
});