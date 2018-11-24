import {ShineBotConstants} from "../../Constants";

/**
 * A static repository for holding region names for ShineBot
 */
export abstract class RegionManager {
    /**
     * The collection of regions.
     */
    private static _regions: Array<string> = [];

    /**
     * Gets the full list of regions
     */
    public static get regions(): Array<string> {
        // Copies the array to avoid mutation by other classes
        let regionsCopy: string[] = [];
        for (let i = 0; i < RegionManager._regions.length; i++) {
            regionsCopy[i] = RegionManager._regions[i];
        }
        return regionsCopy;
    }

    /**
     * Initializes the region list.
     */
    public static initialize() {
        RegionManager._regions = require(ShineBotConstants.assetPath + "regions.json") as Array<string>;
    }

    /**
     * Validates that a string matches up with a region on the region list.
     * @param potentialRegion The name to test as a region.
     */
    public static validateRegion(potentialRegion: string): boolean {
        return (RegionManager._regions.find( (name: string) => name.toLowerCase() === potentialRegion.toLowerCase() ) !== undefined);
    }
}
