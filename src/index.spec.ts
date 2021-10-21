import { MongoClient, Db, ObjectId } from 'mongodb';
import faker from 'faker';

describe('insert', () => {
    let connection: MongoClient;
    let db: Db;

    beforeAll(async () => {
        const { __MONGO_URI__ } = global as any;

        connection = await MongoClient.connect(__MONGO_URI__, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        db = await connection.db();
    });

    it('should insert a doc into collection', async () => {
        const users = db.collection('users');

        const mockUser = { _id: new ObjectId('some-user-id'), commit: faker.git.commitMessage() };
        await users.insertOne(mockUser);
        console.log(mockUser);
        
        const insertedUser = await users.findOne({ _id: new ObjectId('some-user-id') });
        expect(insertedUser).toEqual(mockUser);
    });

    afterAll(async () => {
        await connection.close();
    });
});

