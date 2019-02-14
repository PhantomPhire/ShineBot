/**
 * Represents a static repository for constants in the application.
 */
export abstract class ShineBotConstants {
    /**
     * The guild Id of the Oklhoma Melee Discord.
     * @constant
     */
    public static readonly oklahomaMeleeDiscordId: string = "289489728615743488";

    /**
     * The path to the root of the application.
     * @constant
     */
    public static readonly rootPath: string = __dirname + "/../../";

    /**
     * The path to the assets folder.
     * @constant
     */
    public static readonly assetPath: string = ShineBotConstants.rootPath + "assets/";

    /**
     * Defines the id of the regionless role for Oklahoma Melee Discord
     * @constant
     */
    public static readonly regionlessRole: string = "291600398354219018";

    /**
     * Defines the id of the netplay role for Oklahoma Melee Discord
     * @constant
     */
    public static readonly netplayRole: string = "312278623887294484";

    /**
     * Defines the id of the legacy role for Oklahoma Melee Discord
     * @constant
     */
    public static readonly legacyRole: string = "544936579538616321";
}