import * as plugin from "../src/index";

describe("index", () => {
  describe("getPaths", () => {
    test("should return paths", async () => {
      jest
        .spyOn(plugin, "getPrefix")
        .mockReturnValueOnce(Promise.resolve("prefix"));
      const [js, css] = await plugin.getPaths();
      expect(js).toBe(
        "https://dc69wn9dwut4o.cloudfront.net/content/prefix/main.js"
      );
      expect(css).toBe(
        "https://dc69wn9dwut4o.cloudfront.net/content/prefix/styles.css"
      );
    });
  });

  describe("getPrefix", () => {
    test("should return valid prefix", async () => {
      const json = { prefix: "asdf" };
      const mockJson = jest.fn().mockReturnValueOnce(Promise.resolve(json));
      const mockFetch = jest.fn().mockReturnValueOnce(
        Promise.resolve({
          json: mockJson,
        })
      );
      jest.spyOn(window, "fetch").mockImplementationOnce(mockFetch);
      const prefix = await plugin.getPrefix();
      expect(prefix).toBe("asdf");
    });

    test("should return invalid prefix", async () => {
      const mockJson = jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(undefined));
      const mockFetch = jest.fn().mockReturnValueOnce(
        Promise.resolve({
          json: mockJson,
        })
      );
      jest.spyOn(window, "fetch").mockImplementationOnce(mockFetch);
      const prefix = await plugin.getPrefix();
      expect(prefix).toBe(undefined);
    });
  });
});
