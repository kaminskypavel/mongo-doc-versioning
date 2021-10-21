import { MongoClient, Db, ObjectId } from "mongodb";
import faker from "faker";
import { getMongoUri } from "./utils/env";
import { MongoDb } from ".";
import { MongoVersionedDocument } from "./types";

describe("insert", () => {
  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    const { __MONGO_URI__ } = global as any;

    connection = await MongoClient.connect(getMongoUri(), {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");

    const mockUser = {
      _id: new ObjectId("some-user-id"),
      commit: faker.git.commitMessage(),
    };
    await users.insertOne(mockUser);
    console.log(mockUser);

    const insertedUser = await users.findOne({
      _id: new ObjectId("some-user-id"),
    });
    expect(insertedUser).toEqual(mockUser);
  });

  afterAll(async () => {
    await connection.close();
  });
});

describe("#MongoDb", () => {
  const mongoDb = new MongoDb(getMongoUri());

  const user = {
    username: faker.internet.userName(),
    hobbies: [faker.hacker.noun(), faker.hacker.noun()],
  };

  const userV2 = {
    username: faker.internet.userName(),
    hobbies: [faker.hacker.noun(), faker.hacker.noun()],
  };

  const userV3 = {
    username: faker.internet.userName(),
    hobbies: [faker.hacker.noun(), faker.hacker.noun()],
  };

  beforeAll(async () => {
    await mongoDb.initialize();
  });

  describe("#insertDocument", () => {
    it("should version a document", async () => {
      const doc = await mongoDb.insertDocument(user);
      expect(doc.current.data).toBe(user);
      expect(doc.revisions).toEqual([]);
    });

    //   it("should insert a doc into collection", async () => {
    //     let doc;
    //     doc = await mongoDb.insertDocument(user);
    //     doc = await mongoDb.insertDocument(userV2);
    //     doc = await mongoDb.insertDocument(userV3);

    //     expect(doc.current.data).toBe(user);
    //     expect(doc.revisions).toEqual([]);
    //   });
  });

  describe("#findDocument", () => {
    it("should find a document by _id", async () => {
      const { _id } = await mongoDb.insertDocument(user);
      const doc = await mongoDb.findDocument(_id);

      expect(doc).toEqual(user);
    });
    it("should find a document and return it 'raw'", async () => {
      const { _id } = await mongoDb.insertDocument(user);

      const doc = (await mongoDb.findDocument(_id, {
        raw: true,
      })) as MongoVersionedDocument;

      expect(ObjectId.isValid(doc._id)).toBeTruthy();
    });
  });

  afterAll(async () => {
    await mongoDb.close();
  });
});
