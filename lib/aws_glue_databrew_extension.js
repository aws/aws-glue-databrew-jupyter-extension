import { ILayoutRestorer, } from '@jupyterlab/application';
import { ICommandPalette, } from '@jupyterlab/apputils';
import { ILauncher, } from '@jupyterlab/launcher';
import { GLUE_DATABREW_RENDER } from './constants';
import { LeftSideLauncher, } from './LeftSideLauncher';
import { MainLauncher, } from './MainLauncher';
const getAppVersion = (app) => Number(app.version.split('.')[0]);
/**
 * Initialize the console widget extension
 */
export const initiateExtension = (getPaths) => {
    const activate = async (app, palette, restorer, launcher) => {
        const version = getAppVersion(app);
        // Declare a widget variable
        const [jsPath, cssPath] = await getPaths();
        const consoleWidget = MainLauncher.create(version, cssPath);
        app.commands.addCommand(GLUE_DATABREW_RENDER, {
            label: 'Launch AWS Glue DataBrew',
            icon: 'jp-databrew-logo',
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
        const launcherWidget = LeftSideLauncher.create(version, app.commands);
        restorer.add(launcherWidget, launcherWidget.id);
        app.shell.add(launcherWidget, 'left');
        // Add the command to the palette.
        palette.addItem({ command: GLUE_DATABREW_RENDER, category: 'Launcher' });
        if (launcher) {
            const launcher_item = {
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
    const extension = {
        id: 'aws_glue_databrew_jupyter',
        autoStart: true,
        requires: [ICommandPalette, ILayoutRestorer, ILauncher],
        activate: activate,
    };
    return extension;
};
