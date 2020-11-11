import {
  JupyterFrontEnd, JupyterFrontEndPlugin, ILayoutRestorer
} from '@jupyterlab/application';

import {
  ICommandPalette,
} from '@jupyterlab/apputils';

import {
  ILauncher
} from '@jupyterlab/launcher';

import {
  Widget,
} from '@lumino/widgets';

import {
  CommandRegistry,
} from '@lumino/commands';

import {
  LabIcon
} from '@jupyterlab/ui-components';

import DATABREW_ICON from '../style/icons/databrew.svg';

type GetPathsFunction = () => Promise<string[]>;
const GLUE_DATABREW_RENDER = 'gluedatabrew:render';


/**
 * Left side launcher widget
 */
export class LeftSideLauncherWidget extends Widget {
  /**
   * Command Registry
   */
  commands: CommandRegistry;

  constructor(commands: CommandRegistry) {
    super();
    this.commands = commands;

    const launchButton = document.createElement('div');
    const header = document.createElement('header');
    header.className = 'aws_glue_databrew_header';
    header.textContent = 'AWS Glue DataBrew';

    launchButton.title = 'Welcome to AWS Glue DataBrew';
    launchButton.id = 'aws_glue_databrew_launch_button';
    launchButton.textContent = 'Launch AWS Glue DataBrew';
    launchButton.onclick = this.handleLaunchButtonClicked.bind(this);

    this.node.appendChild(header);
    this.node.appendChild(launchButton);
  }

  handleLaunchButtonClicked() {
    this.commands.execute(GLUE_DATABREW_RENDER);
  }
}

/**
 * A GlueDataBrew console viewer.
 */
export class GlueDataBrewConsoleWidget extends Widget {
  /**
   * The image element associated with the widget.
   */
  readonly consoleRoot: HTMLElement;

  /**
   * A path to css assets
   */
  readonly cssPath: string;

  /**
   * Construct a new glue databrew console widget.
   */
  constructor(cssPath: string) {
    super();

    this.cssPath = cssPath;
    this.id = 'aws_glue_databrew_jupyter';
    this.title.label = 'AWS Glue DataBrew';
    this.title.closable = true;

    this.consoleRoot = document.createElement('html');
    this.consoleRoot.setAttribute('style', 'height: 100%');
    this.node.appendChild(this.consoleRoot);

    this.consoleRoot.insertAdjacentHTML('beforeend',
      `
        <head>
          <meta charset="UTF-8">
          <meta name="awsc-lang" content="en">
          <meta name="aws-glue-databrew-jupyter" content="true">
          <title>AWS</title>
          <link rel="stylesheet" href=` + cssPath + `>
          <style>
            .loader {
              display: inline-block;
              border: 5px solid #f3f3f3;
              border-radius: 50%;
              border-top: 5px solid #3498db;
              width: 40px;
              height: 40px;
              margin-right: 12px;
              -webkit-animation: spin 2s linear infinite;
              animation: spin 2s linear infinite;
            }

            @-webkit-keyframes spin {
              0% { -webkit-transform: rotate(0deg); }
              100% { -webkit-transform: rotate(360deg); }
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            .loader-container {
              font-size: 60px;
              font-weight: 100;
              color: #879196;
              height: 100%;
              width: 100%;
              justify-content: center;
              display: flex;
              align-items: center;
            }
          </style>
        </head>
        <body style="height: 100%">
          <div id="app" style="height: 100%">
            <div class="loader-container">
              <div>
                <div class="loader"></div><span>Launching AWS Glue DataBrew</span>
              </div>
            </div>
          </div>
        </body>
    `,
    );
  }
}

/**
 * Initialize the console widget extension
 */
export const initiateExtension = (getPaths: GetPathsFunction) => {
  const activate = async (app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer, launcher: ILauncher) => {

    // Declare a widget variable
    const [jsPath, cssPath] = await getPaths();
    const consoleWidget: GlueDataBrewConsoleWidget = new GlueDataBrewConsoleWidget(cssPath);

    const databrewIcon = new LabIcon({
      name: 'gluedatabrew:icon',
      svgstr: DATABREW_ICON
    });

    app.commands.addCommand(GLUE_DATABREW_RENDER, {
      label: 'Launch AWS Glue DataBrew',
      icon: databrewIcon,
      execute: () => {
        if (!consoleWidget.isAttached) {
          app.shell.add(consoleWidget, 'main');
          const script = document.createElement('script');

          script.setAttribute('src', jsPath);
          consoleWidget.consoleRoot.appendChild(script);
        }
        app.shell.activateById(consoleWidget.id);
      },
    });

    const launcherWidget = new LeftSideLauncherWidget(app.commands);
    launcherWidget.id = 'aws_glue_databrew_jupyter_left_side_launcher';
    launcherWidget.title.iconClass = 'jp-databrew-logo jp-SideBar-tabIcon';
    launcherWidget.title.caption = 'AWS Glue DataBrew';

    restorer.add(launcherWidget, launcherWidget.id);
    app.shell.add(launcherWidget, 'left');

    // Add the command to the palette.
    palette.addItem({ command: GLUE_DATABREW_RENDER, category: 'Launcher' });
    if (launcher) {
      const launcher_item : ILauncher.IItemOptions = {
          command: GLUE_DATABREW_RENDER,
          args: {
            newBrowserTab: true,
            title: 'Launch Databrew',
            id: 'databrew-launcher'
          },
          category: 'Other'
      };
      
      launcher.add(launcher_item);
    }
  };

  const extension: JupyterFrontEndPlugin<void> = {
    id: 'aws_glue_databrew_jupyter',
    autoStart: true,
    requires: [ICommandPalette, ILayoutRestorer, ILauncher],
    activate: activate,
  };

  return extension;
};

