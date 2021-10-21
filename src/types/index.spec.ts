import { instanceOfVersionedDocument } from ".";

describe("#instanceOfVersionedDocument", () => {
  it("should return true if the object is an instance of VersionedDocument", () => {
    const a = {
      current: {},
      revisions: [],
    };

    expect(instanceOfVersionedDocument(a)).toBe(true);
  });
  it("should return false for any other obj type", () => {
    const a = {
      mysupervalue: {},
      revisions: [],
    };

    expect(instanceOfVersionedDocument(a)).toBe(false);
  });
});
