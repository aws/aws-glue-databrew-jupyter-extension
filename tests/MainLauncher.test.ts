import { MainLauncher } from "../src/MainLauncher";
import { AWSRegion } from "../src/types";

describe("MainLauncher", () => {
  describe("create", () => {
    test.each([[1], [2]])("should create launcher v%s", (version) => {
      const baseUrl = "/";
      const region = "us-east-1";
      const cssPath = "path";
      const widget = MainLauncher.create(version, baseUrl, cssPath, region);
      expect(widget.cssPath).toEqual(cssPath);
      expect(widget.id).toEqual("aws_glue_databrew_jupyter");
      expect(widget.title.label).toEqual("AWS Glue DataBrew");
      expect(widget.title.closable).toEqual(true);
      expect(widget.node).toMatchSnapshot();
    });

    test.each([[1], [2]])("should create launcher v%s with undefined region", (version) => {
      const baseUrl = "/";
      const region: AWSRegion = undefined;
      const cssPath = "path";
      const widget = MainLauncher.create(version, baseUrl, cssPath, region);
      expect(widget.cssPath).toEqual(cssPath);
      expect(widget.id).toEqual("aws_glue_databrew_jupyter");
      expect(widget.title.label).toEqual("AWS Glue DataBrew");
      expect(widget.title.closable).toEqual(true);
      expect(widget.node).toMatchSnapshot();
    });

    test.each([[1], [2]])("should create launcher v%s with null region", (version) => {
      const baseUrl = "/";
      const region: AWSRegion = null;
      const cssPath = "path";
      const widget = MainLauncher.create(version, baseUrl, cssPath, region);
      expect(widget.cssPath).toEqual(cssPath);
      expect(widget.id).toEqual("aws_glue_databrew_jupyter");
      expect(widget.title.label).toEqual("AWS Glue DataBrew");
      expect(widget.title.closable).toEqual(true);
      expect(widget.node).toMatchSnapshot();
    });
  });
});
