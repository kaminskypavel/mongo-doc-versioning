import { connect, disconnect } from "mongoose";
import { VersionedDocumentModel } from "./../model/versionedDocument";
import { MongoVersionedDocument, DocumentData } from "./../types";

export class MongoDb {
  private mongoUri;

  constructor(mongoUri: string) {
    this.mongoUri = mongoUri;
  }

  async initialize() {
    await connect(this.mongoUri);
  }

  async insertDocument(data: any): Promise<MongoVersionedDocument> {
    const newDocument = await VersionedDocumentModel.create({
      current: { data },
      revisions: [],
    });

    const insertedDoc = await newDocument.save();
    return insertedDoc;
  }

  async findDocument(
    _id: string,
    opts = { raw: false }
  ): Promise<MongoVersionedDocument | object | null | undefined> {
    const { raw } = opts;
    const projection = raw ? {} : { "current.data": 1 };
    const doc = await VersionedDocumentModel.findById(_id, projection);

    return raw ? doc : doc?.current?.data;
  }

  async close() {
    await disconnect();
  }
}
