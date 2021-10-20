import { MongoClient, Db,ObjectID } from 'mongodb';
import * as env from "./env"
import mongoose from 'mongoose';

describe('insert', () => {
    let connection: MongoClient;
    let db: Db;

    beforeAll(async () => {
        const { __MONGO_URI__ } = global as any;
        console.log(11111111111, __MONGO_URI__);

        connection = await MongoClient.connect(__MONGO_URI__, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        db = await connection.db();
    });

    it('should insert a doc into collection', async () => {
        const users = db.collection('users');
        console.log(222, await db.collection('users').countDocuments());

        const mockUser = { _id: new mongoose.Types.ObjectId('some-user-id'), name: 'John' };
        await users.insertOne(mockUser);
        console.log(222, await db.collection('users').countDocuments());

        const insertedUser = await users.findOne({ _id: new mongoose.Types.ObjectId('some-user-id') });
        expect(insertedUser).toEqual(mockUser);
    });

    afterAll(async () => {
        await connection.close();
    });
});

