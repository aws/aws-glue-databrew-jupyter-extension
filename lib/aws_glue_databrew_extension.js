import { ILayoutRestorer, } from '@jupyterlab/application';
import { ICommandPalette, } from '@jupyterlab/apputils';
import { Widget, } from '@lumino/widgets';
const GLUE_DATABREW_RENDER = 'gluedatabrew:render';
/**
 * Left side launcher widget
 */
export class LeftSideLauncherWidget extends Widget {
    constructor(commands) {
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
     * Construct a new glue databrew console widget.
     */
    constructor(cssPath) {
        super();
        this.cssPath = cssPath;
        this.id = 'aws_glue_databrew_jupyter';
        this.title.label = 'AWS Glue DataBrew';
        this.title.closable = true;
        this.consoleRoot = document.createElement('html');
        this.node.appendChild(this.consoleRoot);
        this.consoleRoot.insertAdjacentHTML('beforeend', `
        <head>
          <meta charset="UTF-8">
          <meta name="awsc-lang" content="en">
          <meta name="aws-glue-databrew-jupyter" content="true">
          <title>AWS</title>
          <link rel="stylesheet" href=` + cssPath + `>
          <style>
            .loader {
              border: 16px solid #f3f3f3;
              border-radius: 50%;
              border-top: 16px solid #3498db;
              width: 120px;
              height: 120px;
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
              margin: 12px;
            }
          </style>
        </head>
        <body>
          <div id="app">
            <div class="loader-container>
              <div style="font-size: 16px; margin-bottom: 12px;">Loading</div>
              <div class="loader"/>
            </div>
          </div>
        </body>
    `);
    }
}
/**
 * Initialize the console widget extension
 */
export const initiateExtension = (getPaths) => {
    const activate = async (app, palette, restorer) => {
        // Declare a widget variable
        const [jsPath, cssPath] = await getPaths();
        const consoleWidget = new GlueDataBrewConsoleWidget(cssPath);
        app.commands.addCommand(GLUE_DATABREW_RENDER, {
            label: 'Launch AWS Glue DataBrew',
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
        launcherWidget.title.iconClass = 'jp-SpreadsheetIcon jp-SideBar-tabIcon';
        launcherWidget.title.caption = 'AWS Glue DataBrew';
        restorer.add(launcherWidget, launcherWidget.id);
        app.shell.add(launcherWidget, 'left');
        // Add the command to the palette.
        palette.addItem({ command: GLUE_DATABREW_RENDER, category: 'Launcher' });
    };
    const extension = {
        id: 'aws_glue_databrew_jupyter',
        autoStart: true,
        requires: [ICommandPalette, ILayoutRestorer],
        activate: activate,
    };
    return extension;
};
