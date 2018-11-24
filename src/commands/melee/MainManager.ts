import {ShineBotConstants} from "../../Constants";

/**
 * A static repository for holding main names for ShineBot
 */
export abstract class MainManager {
    /**
     * The collection of mains.
     */
    private static _mains: Array<string> = [];

    /**
     * Gets the full list of mains
     */
    public static get mains(): Array<string> {
        // Copies the array to avoid mutation by other classes
        let mainsCopy: string[] = [];
        for (let i = 0; i < MainManager._mains.length; i++) {
            mainsCopy[i] = MainManager._mains[i];
        }
        return mainsCopy;
    }

    /**
     * Initializes the region list.
     */
    public static initialize() {
        MainManager._mains = require(ShineBotConstants.assetPath + "mains.json") as Array<string>;
    }

    /**
     * Validates that a string matches up with a main on the main list.
     * @param potentialRegion The name to test as a main.
     */
    public static validateMain(potentialMain: string): boolean {
        return (MainManager._mains.find( (name: string) => name.toLowerCase() === potentialMain.toLowerCase() ) !== undefined);
    }

    /**
     * Formats input to match up with a min string
     * @param input The input to format.
     */
    public static getFormattedMainString(input: string): string {
        return input.toLowerCase().replace(/\./g, "");
    }
}
