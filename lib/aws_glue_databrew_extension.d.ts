import { JupyterFrontEndPlugin } from '@jupyterlab/application';
/**
 * Initialize the console widget extension
 */
export declare const initiateExtension: (getPaths: () => Promise<string[]>) => JupyterFrontEndPlugin<void>;
