import { isTest, getMongoUri, getEnviromentVariable } from "./env";

describe("#isTest", () => {
  it("should return true when runing jest", () => {
    expect(isTest()).toBeTruthy();
  });
});

describe("#getMongoUri", () => {
  it("should return a value for in-memory-mongo", () => {
    expect(getMongoUri()).toContain("mongodb://127.0.0.1");
  });
});

describe("#getEnviromentVariable", () => {
  it("should throw if an env is not defined", () => {
    expect(() => getEnviromentVariable("__dummy_env_var__")).toThrow();
  });
});

describe("#isTest", () => {
  it("should return true for jest env", () => {
    expect(isTest()).toBeTruthy();
  });
});
