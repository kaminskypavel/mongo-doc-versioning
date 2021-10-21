import { connect, disconnect } from "mongoose";
import { VersionedDocumentModel } from "./../model/versionedDocument";
import {
  instanceOfVersionedDocument,
  MongoVersionedDocument,
  VersionedDocument,
} from "./../types";

export class MongoDb {
  private mongoUri;

  constructor(mongoUri: string) {
    this.mongoUri = mongoUri;
  }

  async initialize() {
    await connect(this.mongoUri);
  }

  async insertDocument(data: any): Promise<MongoVersionedDocument> {
    if (instanceOfVersionedDocument(data)) {
      throw new Error(
        "Cannot insert a VersionedDocument, please insert just the raw data"
      );
    }

    const newDocument = await VersionedDocumentModel.create({
      current: { data },
      revisions: [],
    });

    const insertedDoc = await newDocument.save();
    return insertedDoc;
  }

  async findDocument(
    _id: string,
    opts = { raw: false, versions: true }
  ): Promise<MongoVersionedDocument | object | null | undefined> {
    const { raw = false } = opts;
    const projection = raw ? {} : { "current.data": 1 };
    const doc = await VersionedDocumentModel.findById(_id, projection);

    return raw ? doc : doc?.current?.data;
  }

  async close() {
    await disconnect();
  }
}
