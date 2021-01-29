import { Widget as PhosphorWidget } from "@phosphor/widgets";
import { CommandRegistry as PhosphorCommandRegistry } from "@phosphor/commands";
import { Widget as LuminoWidget } from "@lumino/widgets";
import { CommandRegistry as LuminoCommandRegistry } from "@lumino/commands";
export declare class PhosphorLeftSideLauncher extends PhosphorWidget {
    /**
     * Command Registry
     */
    commands: PhosphorCommandRegistry;
    handleLaunchButtonClicked(): undefined;
}
export declare class LuminoLeftSideLauncher extends LuminoWidget {
    /**
     * Command Registry
     */
    commands: LuminoCommandRegistry;
    handleLaunchButtonClicked(): undefined;
}
export declare class LeftSideLauncher {
    static create(version: number, commands: PhosphorCommandRegistry | LuminoCommandRegistry): PhosphorLeftSideLauncher | LuminoLeftSideLauncher;
}
