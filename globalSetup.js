const setup = require('@shelf/jest-mongodb/setup');

module.exports = async () => {
    console.info('check if mongo runing โกโกโก');

    if (global.__MONGOD__) {
        console.info('yes! MongoDB is running ๐๐๐');
        try {
            console.info('stopping mongo1 ๐๐๐');
            await global.__MONGOD__.stop();
        } catch (err) {
            console.info('ooooooooops error ๐๐', err);
        }
    }

    setup();
};
