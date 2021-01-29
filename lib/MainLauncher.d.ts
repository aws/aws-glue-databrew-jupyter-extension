import { Widget as PhosphorWidget } from "@phosphor/widgets";
import { Widget as LuminoWidget } from "@lumino/widgets";
import { AWSRegion } from "./types";
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
    static create(version: number, baseUrl: string, cssPath: string, region: AWSRegion): PhosphorMainLauncher | LuminoMainLauncher;
}
