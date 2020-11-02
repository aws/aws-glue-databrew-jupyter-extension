import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { Widget } from '@lumino/widgets';
import { CommandRegistry } from '@lumino/commands';
declare type GetPathsFunction = () => Promise<string[]>;
/**
 * Left side launcher widget
 */
export declare class LeftSideLauncherWidget extends Widget {
    /**
     * Command Registry
     */
    commands: CommandRegistry;
    constructor(commands: CommandRegistry);
    handleLaunchButtonClicked(): void;
}
/**
 * A GlueDataBrew console viewer.
 */
export declare class GlueDataBrewConsoleWidget extends Widget {
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
    constructor(cssPath: string);
}
/**
 * Initialize the console widget extension
 */
export declare const initiateExtension: (getPaths: GetPathsFunction) => JupyterFrontEndPlugin<void>;
export {};
