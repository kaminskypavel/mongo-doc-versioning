import { connect, disconnect } from "mongoose";
import { VersionedDocumentModel } from "./model/versionedDocument";
import { MongoVersionedDocument, DocumentData } from "./types";

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
    const doc = await VersionedDocumentModel.findById(_id);
    const res = raw ? doc : doc?.current?.data;

    return res;
  }

  async close() {
    await disconnect();
  }
}
