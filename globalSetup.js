const setup = require('@shelf/jest-mongodb/setup');

module.exports = async () => {
    console.info('check if mongo runing ⚡⚡⚡');

    if (global.__MONGOD__) {
        console.info('yes! MongoDB is running 🏃🏃🏃');
        try {
            console.info('stopping mongo1 🛑🛑🛑');
            await global.__MONGOD__.stop();
        } catch (err) {
            console.info('ooooooooops error 😔😔', err);
        }
    }

    setup();
};
