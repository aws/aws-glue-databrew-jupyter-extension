import { Widget as PhosphorWidget } from '@phosphor/widgets';
import { Widget as LuminoWidget } from '@lumino/widgets';
export declare class PhosphorMainLauncher extends PhosphorWidget {
    /**
     * The image element associated with the widget.
     */
    consoleRoot: HTMLElement;
    /**
     * A path to css assets
     */
    cssPath: string;
}
export declare class LuminoMainLauncher extends LuminoWidget {
    /**
     * The image element associated with the widget.
     */
    consoleRoot: HTMLElement;
    /**
     * A path to css assets
     */
    cssPath: string;
}
export declare class MainLauncher {
    static create(version: number, cssPath: string, region: string): PhosphorMainLauncher | LuminoMainLauncher;
}
