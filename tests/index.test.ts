import * as plugin from "../src/index";

describe("index", () => {
  describe("getPaths", () => {
    test("should return paths", async () => {
      jest
        .spyOn(plugin, "getPrefix")
        .mockReturnValueOnce(Promise.resolve("prefix"));
      const [js, css] = await plugin.getPaths("us-west-1");
      expect(js).toBe(
        "https://dc69wn9dwut4o.cloudfront.net/content/prefix/main.js"
      );
      expect(css).toBe(
        "https://dc69wn9dwut4o.cloudfront.net/content/prefix/styles.css"
      );
    });

    test("should return paths in cn region", async () => {
      jest
        .spyOn(plugin, "getPrefix")
        .mockReturnValueOnce(Promise.resolve("prefix"));
      const [js, css] = await plugin.getPaths("cn-north-1");
      expect(js).toBe(
        "https://elixir-console-assets-prod-bjs.s3.cn-north-1.amazonaws.com.cn/content/prefix/main.js"
      );
      expect(css).toBe(
        "https://elixir-console-assets-prod-bjs.s3.cn-north-1.amazonaws.com.cn/content/prefix/styles.css"
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
      const prefix = await plugin.getPrefix("us-west-1");
      expect(prefix).toBe("asdf");
    });

    test("should return valid prefix in cn region", async () => {
      const json = { prefix: "asdf" };
      const mockJson = jest.fn().mockReturnValueOnce(Promise.resolve(json));
      const mockFetch = jest.fn().mockReturnValueOnce(
        Promise.resolve({
          json: mockJson,
        })
      );
      jest.spyOn(window, "fetch").mockImplementationOnce(mockFetch);
      const prefix = await plugin.getPrefix("cn-north-1");
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
      const prefix = await plugin.getPrefix("us-west-1");
      expect(prefix).toBe(undefined);
    });
  });
});
