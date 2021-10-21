import mongoose from "mongoose";

export type Metadata = {
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentData = {
  metadata: Metadata;
  data: object;
};

export interface VersionedDocument {
  current: DocumentData;
  revisions?: DocumentData[];
}

export type MongoVersionedDocument = VersionedDocument &
  mongoose.Document<any, any, VersionedDocument>;
