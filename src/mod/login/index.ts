import {CommandoClient} from "discord.js-commando";

let bot: CommandoClient;
let token: string;

export function injectBot(injectedBot: CommandoClient, tokenIn: string) {
    token = tokenIn;
    bot = injectedBot;
    bot.on("disconnect", waitThenLogin);
    bot.on("WaitAttempt", waitThenLogin);
    bot.on("attemptLogin", attemptLogin);
    attemptLogin();
}

function attemptLogin() {
    console.log("attempting login");
    bot.login(token).catch((err) => {
        console.log("Login Failed");
        console.log(err);
    });

    setTimeout(() => {
        if (bot.status === 5 || bot.status === 3) {
            console.log("login attempt timed out");
            console.log("Status: " + bot.status);
            bot.emit("attemptLogin");
        }
        else if (bot.status !== 0) {
            console.log("Status: " + bot.status + "\nStill waiting");
            bot.emit("WaitAttempt");
        }
        else {
            console.log("login successful");
        }
    },         10000);
}

function waitThenLogin() {
    setTimeout(() => {
        if (bot.status === 5 || bot.status === 3) {
            console.log("Waited, status: " + bot.status);
            attemptLogin();
        }
        else if (bot.status !== 0) {
            console.log("Status: " + bot.status + "\nStill waiting");
            bot.emit("WaitAttempt");
        }
    },         10000);
}