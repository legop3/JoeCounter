import { ActivityType, Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
import { count, decrement, increment, sendComments } from "./counterSync.js";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

function updateStatus() {
    client.user.setPresence({
        activities: [{
            type: ActivityType.Custom,
            name: `Hate Counter: ${count}`
        }]
    });
}


client.once("ready", () => {
    console.log("Discord bot is online!");
//   client.user.setActivity("Counting Joes", { type: ActivityType.Watching });

    updateStatus();
    setInterval(updateStatus, 5000); // Update status every 60 seconds
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

        const content = message.content.toLowerCase();

    if (content.startsWith("!hate")) {
        let cleaned = message.content.substring(message.content.indexOf(" ") + 1);
        console.log('cleaned command text:', cleaned)
        increment(cleaned);
        sendComments()
        message.reply(`Report added! \`${cleaned}\`\nCurrent count: ${count + 1}`);
    } else if (content === "!remove") {
        decrement();
        message.reply(`Last entry removed!\nCurrent count: ${count}`);
        sendComments()
    } else if (content === "!count") {
        message.reply(`Current count is: ${count}`);
    } // else if (content === "!comments") {
    //     let docs = sendComments()

    //     console.log(docs)
    // }
});



client.login(process.env.DISCORD_BOT_TOKEN);