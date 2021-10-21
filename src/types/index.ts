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

export const instanceOfVersionedDocument = (
  object: any
): object is VersionedDocument => {
  return "current" in object && "revisions" in object;
};

export type MongoVersionedDocument = VersionedDocument &
  mongoose.Document<any, any, VersionedDocument>;
