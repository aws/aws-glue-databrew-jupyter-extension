import * as client from "../src/client";

describe("client", () => {
  describe("getAWSConfig", () => {
    test("should return from awsproxy", async () => {
      jest.spyOn(client, "get").mockReturnValueOnce(
        Promise.resolve({
          region: "us-west-1",
        })
      );
      const basePath = "/";
      const config = await client.getAWSConfig(basePath);
      expect(config).toEqual({
        region: "us-west-1",
      });
    });

    test("should return undefined from awsproxy", async () => {
      jest.spyOn(client, "get").mockReturnValueOnce(
        Promise.resolve({
          region: undefined,
        })
      );
      const basePath = "/";
      const config = await client.getAWSConfig(basePath);
      expect(config).toEqual({
        region: undefined,
      });
    });

    test("should return from api/getInstanceConfig", async () => {
      jest
        .spyOn(client, "get")
        .mockReturnValueOnce(Promise.reject(new Error()));
      jest.spyOn(client, "post").mockReturnValueOnce(
        Promise.resolve({
          region: "us-west-2",
        })
      );
      const basePath = "/";
      const config = await client.getAWSConfig(basePath);
      expect(config).toEqual({
        region: "us-west-2",
      });
    });

    test("should return undefined from api/getInstanceConfig", async () => {
      jest
        .spyOn(client, "get")
        .mockReturnValueOnce(Promise.reject(new Error()));
      jest.spyOn(client, "post").mockReturnValueOnce(
        Promise.resolve({
          region: undefined,
        })
      );
      const basePath = "/";
      const config = await client.getAWSConfig(basePath);
      expect(config).toEqual({
        region: undefined,
      });
    });
  });

  describe("get", () => {
    test("should build get request", async () => {
      const requestMock = jest
        .spyOn(client, "request")
        .mockReturnValueOnce(Promise.resolve("us-east-1"));
      const response = await client.get("/");
      expect(response).toBe("us-east-1");
      expect(requestMock).toHaveBeenCalledWith(
        new Request("/", { method: "get" })
      );
    });
  });

  describe("get", () => {
    test("should build post request", async () => {
      const requestMock = jest
        .spyOn(client, "request")
        .mockReturnValueOnce(Promise.resolve("us-east-1"));
      const response = await client.post("/");
      expect(response).toBe("us-east-1");
      expect(requestMock).toHaveBeenCalledWith(
        new Request("/", { method: "post" })
      );
    });
  });

  describe("request", () => {
    test("should hand;e successful response", async () => {
      const text = JSON.stringify({ a: "b" });
      const mockText = jest.fn().mockReturnValueOnce(Promise.resolve(text));
      const mockFetch = jest.fn().mockReturnValueOnce(
        Promise.resolve({
          text: mockText,
          ok: true,
        })
      );
      jest.spyOn(window, "fetch").mockImplementationOnce(mockFetch);
      const response = await client.request(new Request("/"));
      expect(response).toEqual({ a: "b" });
    });

    test("should handle empty response", async () => {
      const mockText = jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(undefined));
      const mockFetch = jest.fn().mockReturnValueOnce(
        Promise.resolve({
          text: mockText,
          ok: true,
        })
      );
      jest.spyOn(window, "fetch").mockImplementationOnce(mockFetch);
      const response = await client.request(new Request("/"));
      expect(response).toEqual(undefined);
    });

    test("should handle error response with message", async () => {
      const error = JSON.stringify({ message: "error" });
      const mockText = jest.fn().mockReturnValueOnce(Promise.resolve(error));
      const mockFetch = jest.fn().mockReturnValueOnce(
        Promise.resolve({
          text: mockText,
          ok: false,
        })
      );
      jest.spyOn(window, "fetch").mockImplementationOnce(mockFetch);
      await expect(client.request(new Request("/"))).rejects.toThrow();
    });

    test("should handle error response with no message", async () => {
      const mockText = jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(undefined));
      const mockFetch = jest.fn().mockReturnValueOnce(
        Promise.resolve({
          text: mockText,
          ok: false,
          statusText: "BadRequest",
        })
      );
      jest.spyOn(window, "fetch").mockImplementationOnce(mockFetch);
      await expect(client.request(new Request("/"))).rejects.toThrow();
    });
  });

  describe("parse", () => {
    test("should return parsed value", () => {
      const value = client.parse(JSON.stringify({ a: "b" }));
      expect(value).toEqual({ a: "b" });
    });

    test("should handle invalid value", () => {
      const value = client.parse("<>");
      expect(value).toEqual({});
    });
  });
});
