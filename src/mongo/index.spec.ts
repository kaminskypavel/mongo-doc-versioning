import { MongoClient, Db, ObjectId } from "mongodb";
import faker from "faker";
import { getMongoUri } from "../utils/env";
import { MongoDb } from ".";
import { MongoVersionedDocument } from "../types";
import { VersionedDocument } from "../types/index";

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

    it("shouldn't add a document that has revisions", async () => {
      const doc: Partial<VersionedDocument> = {
        current: {
          data: {},
          metadata: { createdAt: new Date(), updatedAt: new Date() },
        },
        revisions: [],
      };
      expect(mongoDb.insertDocument(doc)).rejects.toThrow(Error);
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
