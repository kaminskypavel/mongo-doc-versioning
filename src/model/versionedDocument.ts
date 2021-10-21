import { Schema, model, connect } from "mongoose";
import { VersionedDocument } from "./../types";

const DocumentDataSchema = new Schema({
    data: {
        type: Schema.Types.Mixed,
        required: true,
    },
    metadata: {
        createdAt: { type: Schema.Types.Date, default: Date.now(), required: false },
        updatedAt: { type: Schema.Types.Date, default: Date.now(), required: false },
    }

})
const VersionedDocumentSchema = new Schema<VersionedDocument>({
    current: DocumentDataSchema,
    revisions: [DocumentDataSchema],
});

export const VersionedDocumentModel = model<VersionedDocument>("VersionedDocument", VersionedDocumentSchema);

