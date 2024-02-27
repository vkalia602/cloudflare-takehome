import { hashValue, isPasswordMatch } from "./utils";
describe("HashValue", () => {
  it("should hash a given value and compare hash", async () => {
    const plainTextPassword = "hello123";
    const hash = await hashValue(plainTextPassword);
    const res = await isPasswordMatch(plainTextPassword, hash);
    expect(hash).not.toEqual(plainTextPassword);
    expect(res).toEqual(true);
  });
});
