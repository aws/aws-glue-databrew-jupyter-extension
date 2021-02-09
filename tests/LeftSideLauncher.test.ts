import { CommandRegistry } from "@phosphor/commands";
import { LeftSideLauncher } from "../src/LeftSideLauncher";

describe("LeftSideLauncher", () => {
  describe("create", () => {
    test.each([["1.0.0"], ["2.0.0"]])("should create launcher v%s", (version) => {
      const execute = jest.fn(() => undefined);
      const command: Partial<CommandRegistry> = { execute };
      const widget = LeftSideLauncher.create(version, command as CommandRegistry);
      expect(widget.id).toBe("aws_glue_databrew_jupyter_left_side_launcher");
      expect(widget.title.iconClass).toBe(
        "jp-databrew-logo jp-SideBar-tabIcon"
      );
      expect(widget.title.caption).toBe("AWS Glue DataBrew");
      expect(widget.node).toMatchSnapshot();
      expect(widget.handleLaunchButtonClicked()).toBe(undefined);
      expect(execute).toHaveBeenCalledTimes(1);
      expect(execute).toHaveBeenCalledWith("gluedatabrew:render");
    });
  });
});
