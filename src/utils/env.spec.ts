import { isTest,getMongoUri } from "./env";

describe('#isTest', () => {
    it('should return true when runing jest', () => {
        expect(isTest()).toBeTruthy();
    });
})
describe('#getMongoUri', () => {
    it('should return a value for in-memory-mongo', () => {
        expect(getMongoUri()).toContain("mongodb://127.0.0.1");
    });
})
