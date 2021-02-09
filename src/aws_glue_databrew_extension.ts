import {
  JupyterFrontEnd, JupyterFrontEndPlugin, ILayoutRestorer,
} from "@jupyterlab/application";
import { ICommandPalette } from "@jupyterlab/apputils";
import { ILauncher } from "@jupyterlab/launcher";
import { Widget } from "@lumino/widgets";
import { getAWSConfig } from "./client";
import { GLUE_DATABREW_RENDER } from "./constants";
import { LeftSideLauncher } from "./LeftSideLauncher";
import { MainLauncher } from "./MainLauncher";

const getAppVersion = (app: JupyterFrontEnd) => app.version;
const getBaseUrl = (app: JupyterFrontEnd) => app.serviceManager.serverSettings.baseUrl;

/**
 * Initialize the console widget extension
 */
export const initiateExtension = (getPaths: () => Promise<string[]>): JupyterFrontEndPlugin<void> => {
  const activate = async (app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer, launcher: ILauncher) => {
    const version = getAppVersion(app);
    const baseUrl = getBaseUrl(app);
    const url = new URL(baseUrl);
    const { region } = await getAWSConfig(url.pathname);
    const [jsPath, cssPath] = await getPaths();

    const consoleWidget = MainLauncher.create(version, baseUrl, cssPath, region);

    app.commands.addCommand(GLUE_DATABREW_RENDER, {
      label: "Launch AWS Glue DataBrew",
      icon: "jp-databrew-logo",
      execute: () => {
        if (!consoleWidget.isAttached) {
          app.shell.add(consoleWidget as Widget, "main");
          const script = document.createElement("script");

          script.setAttribute("src", jsPath);
          consoleWidget.consoleRoot.appendChild(script);
        }
        app.shell.activateById(consoleWidget.id);
      },
    });

    const launcherWidget = LeftSideLauncher.create(version, app.commands);

    restorer.add(launcherWidget as Widget, launcherWidget.id);
    app.shell.add(launcherWidget as Widget, "left");

    // Add the command to the palette.
    palette.addItem({ command: GLUE_DATABREW_RENDER, category: "Launcher" });
    if (launcher) {
      const launcher_item : ILauncher.IItemOptions = {
          command: GLUE_DATABREW_RENDER,
          args: {
            newBrowserTab: true,
            title: "Launch Databrew",
            id: "databrew-launcher",
          },
          category: "Other",
      };

      launcher.add(launcher_item);
    }
  };

  const extension: JupyterFrontEndPlugin<void> = {
    id: "aws_glue_databrew_jupyter",
    autoStart: true,
    requires: [ICommandPalette, ILayoutRestorer, ILauncher],
    activate: activate,
  };

  return extension;
};
