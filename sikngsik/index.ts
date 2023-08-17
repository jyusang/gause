import cron from "node-cron";

import { Bot } from "./bot";
import { config } from "./config";

const bot = new Bot({
  chatId: config.chatId,
  botToken: config.botToken,
});
bot.registerPollAnswerHandler();
bot.start();

cron.schedule(config.crontab, () => bot.sendPoll());
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
