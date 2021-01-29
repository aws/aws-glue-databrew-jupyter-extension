import { ILayoutRestorer, JupyterFrontEnd } from "@jupyterlab/application";
import { ServiceManager, ServerConnection } from "@jupyterlab/services";
import { ICommandPalette } from "@jupyterlab/apputils";
import { ILauncher } from "@jupyterlab/launcher";
import { CommandRegistry } from "@lumino/commands";
import * as plugin from "../src/aws_glue_databrew_extension";
import { LuminoMainLauncher, MainLauncher } from "../src/MainLauncher";
import { LeftSideLauncher, LuminoLeftSideLauncher } from "../src/LeftSideLauncher";
import * as client from "../src/client";

describe("initiateExtension", () => {
  test("should return extension object", () => {
    const getPaths = jest.fn().mockReturnValueOnce(Promise.resolve(["main.js", "styles.css"]));
    const extension = plugin.initiateExtension(getPaths);
    expect(extension.id).toBe("aws_glue_databrew_jupyter");
    expect(extension.autoStart).toBe(true);
    expect(extension.requires).toEqual([ICommandPalette, ILayoutRestorer, ILauncher]);
    expect(extension.activate).toEqual(expect.any(Function));
  });

  describe("activate", () => {
    test("should activate plugin", async () => {
      const getPaths = jest.fn().mockReturnValueOnce(Promise.resolve(["main.js", "styles.css"]));
      jest.spyOn(MainLauncher, "create").mockReturnValueOnce(new LuminoMainLauncher());
      jest.spyOn(LeftSideLauncher, "create").mockReturnValueOnce(new LuminoLeftSideLauncher());
      jest.spyOn(client, "getAWSConfig").mockReturnValueOnce(Promise.resolve({
        region: "us-east-1",
      }));
      const extension = plugin.initiateExtension(getPaths);
      const commands: Partial<CommandRegistry> = {
        addCommand: jest.fn(),
      };
      const serviceManager = {
        serverSettings: {
          baseUrl: "http://localhost:8888/",
        } as ServerConnection.ISettings,
      } as ServiceManager;
      const shell: Partial<JupyterFrontEnd.IShell> = {
        add: jest.fn(),
        activateById: jest.fn(),
      };
      const app: Partial<JupyterFrontEnd>  = {
        commands: commands as CommandRegistry,
        shell: shell as JupyterFrontEnd.IShell,
        serviceManager,
        version: "1.0.0",
      };
      const palette: Partial<ICommandPalette> = {
        addItem: jest.fn(),
      };
      const restorer: Partial<ILayoutRestorer> = {
        add: jest.fn(),
      };
      const launcher: Partial<ILauncher> = {
        add: jest.fn(),
      };
      await extension.activate(
        app as JupyterFrontEnd,
        palette,
        restorer,
        launcher,
      );
      expect(getPaths).toHaveBeenCalledTimes(1);
      expect(commands.addCommand).toHaveBeenCalledTimes(1);
      expect(palette.addItem).toHaveBeenCalledTimes(1);
      expect(shell.add).toHaveBeenCalledTimes(1);
      expect(launcher.add).toHaveBeenCalledTimes(1);
    });

    test("should activate plugin without launcher", async () => {
      const getPaths = jest.fn().mockReturnValueOnce(Promise.resolve(["main.js", "styles.css"]));
      jest.spyOn(MainLauncher, "create").mockReturnValueOnce(new LuminoMainLauncher());
      jest.spyOn(LeftSideLauncher, "create").mockReturnValueOnce(new LuminoLeftSideLauncher());
      jest.spyOn(client, "getAWSConfig").mockReturnValueOnce(Promise.resolve({
        region: "us-east-1",
      }));
      const extension = plugin.initiateExtension(getPaths);
      const commands: Partial<CommandRegistry> = {
        addCommand: jest.fn(),
      };
      const serviceManager = {
        serverSettings: {
          baseUrl: "http://localhost:8888/",
        } as ServerConnection.ISettings,
      } as ServiceManager;
      const shell: Partial<JupyterFrontEnd.IShell> = {
        add: jest.fn(),
        activateById: jest.fn(),
      };
      const app: Partial<JupyterFrontEnd>  = {
        commands: commands as CommandRegistry,
        shell: shell as JupyterFrontEnd.IShell,
        serviceManager,
        version: "1.0.0",
      };
      const palette: Partial<ICommandPalette> = {
        addItem: jest.fn(),
      };
      const restorer: Partial<ILayoutRestorer> = {
        add: jest.fn(),
      };
      const launcher: Partial<ILauncher> = {
        add: jest.fn(),
      };
      await extension.activate(
        app as JupyterFrontEnd,
        palette,
        restorer,
        null,
      );
      expect(getPaths).toHaveBeenCalledTimes(1);
      expect(commands.addCommand).toHaveBeenCalledTimes(1);
      expect(palette.addItem).toHaveBeenCalledTimes(1);
      expect(shell.add).toHaveBeenCalledTimes(1);
      expect(launcher.add).toHaveBeenCalledTimes(0);
    });
  });

  describe("execute", () => {
    test("should handle unattached widget", async () => {
      const getPaths = jest.fn().mockReturnValueOnce(Promise.resolve(["main.js", "styles.css"]));
      const widget = new LuminoMainLauncher();
      widget.consoleRoot = document.createElement("html");
      const mainLauncherMock = jest.spyOn(MainLauncher, "create").mockReturnValueOnce(widget);
      jest.spyOn(LeftSideLauncher, "create").mockReturnValueOnce(new LuminoLeftSideLauncher());
      jest.spyOn(client, "getAWSConfig").mockReturnValueOnce(Promise.resolve({
        region: "us-east-1",
      }));
      const extension = plugin.initiateExtension(getPaths);
      const commands: Partial<CommandRegistry> = {
        addCommand: jest.fn().mockImplementationOnce((_: string, options: { label: string, icon: string, execute: () => void }) => {
          options.execute();
          expect(widget.consoleRoot).toMatchSnapshot();
        }),
      };
      const serviceManager = {
        serverSettings: {
          baseUrl: "http://localhost:8888/",
        } as ServerConnection.ISettings,
      } as ServiceManager;
      const shell: Partial<JupyterFrontEnd.IShell> = {
        add: jest.fn(),
        activateById: jest.fn(),
      };
      const app: Partial<JupyterFrontEnd>  = {
        commands: commands as CommandRegistry,
        shell: shell as JupyterFrontEnd.IShell,
        serviceManager,
        version: "1.0.0",
      };
      const palette: Partial<ICommandPalette> = {
        addItem: jest.fn(),
      };
      const restorer: Partial<ILayoutRestorer> = {
        add: jest.fn(),
      };
      const launcher: Partial<ILauncher> = {
        add: jest.fn(),
      };
      await extension.activate(
        app as JupyterFrontEnd,
        palette,
        restorer,
        launcher,
      );
      expect(getPaths).toHaveBeenCalledTimes(1);
      expect(commands.addCommand).toHaveBeenCalledTimes(1);
      expect(palette.addItem).toHaveBeenCalledTimes(1);
      expect(shell.add).toHaveBeenCalledTimes(2);
      expect(launcher.add).toHaveBeenCalledTimes(1);
      expect(mainLauncherMock).toHaveBeenCalledTimes(1);
    });

    test("should handle attached widget", async () => {
      const getPaths = jest.fn().mockReturnValueOnce(Promise.resolve(["main.js", "styles.css"]));
      const widget = new LuminoMainLauncher();
      const mainLauncherMock = jest.spyOn(MainLauncher, "create").mockImplementationOnce(() => {
        Object.defineProperty(widget, "isAttached", { value: true });
        widget.id = "id";
        return widget;
      });
      jest.spyOn(LeftSideLauncher, "create").mockReturnValueOnce(new LuminoLeftSideLauncher());
      jest.spyOn(client, "getAWSConfig").mockReturnValueOnce(Promise.resolve({
        region: "us-east-1",
      }));
      const extension = plugin.initiateExtension(getPaths);
      const commands: Partial<CommandRegistry> = {
        addCommand: jest.fn().mockImplementationOnce((_: string, options: { label: string, icon: string, execute: () => void }) => {
          options.execute();
          expect(widget.consoleRoot).toMatchSnapshot();
        }),
      };
      const serviceManager = {
        serverSettings: {
          baseUrl: "http://localhost:8888/",
        } as ServerConnection.ISettings,
      } as ServiceManager;
      const shell: Partial<JupyterFrontEnd.IShell> = {
        add: jest.fn(),
        activateById: jest.fn(),
      };
      const app: Partial<JupyterFrontEnd>  = {
        commands: commands as CommandRegistry,
        shell: shell as JupyterFrontEnd.IShell,
        serviceManager,
        version: "1.0.0",
      };
      const palette: Partial<ICommandPalette> = {
        addItem: jest.fn(),
      };
      const restorer: Partial<ILayoutRestorer> = {
        add: jest.fn(),
      };
      const launcher: Partial<ILauncher> = {
        add: jest.fn(),
      };
      await extension.activate(
        app as JupyterFrontEnd,
        palette,
        restorer,
        launcher,
      );
      expect(getPaths).toHaveBeenCalledTimes(1);
      expect(commands.addCommand).toHaveBeenCalledTimes(1);
      expect(palette.addItem).toHaveBeenCalledTimes(1);
      expect(shell.add).toHaveBeenCalledTimes(1);
      expect(shell.activateById).toHaveBeenCalledTimes(1);
      expect(shell.activateById).toHaveBeenCalledWith("id");
      expect(launcher.add).toHaveBeenCalledTimes(1);
      expect(mainLauncherMock).toHaveBeenCalledTimes(1);
    });
  });
});
