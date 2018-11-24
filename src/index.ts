import {ShineBotManager} from "./ShineBotManager";

setup();

/**
 * Sets up bot functionality.
 */
function setup() {
    const botManager = new ShineBotManager();
    botManager.run();
}
