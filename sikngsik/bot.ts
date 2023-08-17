import { Telegraf } from "telegraf";

import { config } from "./config";

export class Bot {
  chatId: string;
  telegraf: Telegraf;

  constructor(args: { botToken: string; chatId: string }) {
    this.chatId = args.chatId;
    this.telegraf = new Telegraf(args.botToken);
  }

  start() {
    this.registerPollAnswerHandler();
    this.telegraf.launch();
  }

  stop(reason?: string) {
    this.telegraf.stop(reason);
  }

  registerPollAnswerHandler() {
    this.telegraf.on("poll_answer", ({ pollAnswer }) => {
      const { option_ids, user } = pollAnswer;
      if (option_ids.length === 1) {
        this.sendMessage(`${user.first_name}${this.getOption(option_ids[0])}`);
      }
    });
  }

  sendPoll() {
    this.telegraf.telegram.sendPoll(
      this.chatId,
      this.getQuestion(),
      this.getOptions(),
      {
        is_anonymous: false,
      }
    );
  }

  sendMessage(message: string) {
    this.telegraf.telegram.sendMessage(this.chatId, message);
  }

  private getQuestion() {
    const now = new Date();
    return `${config.question} (${now.toLocaleDateString()})`;
  }

  private getOption(idx: number) {
    return this.getOptions()[idx];
  }

  private getOptions() {
    return config.options.split(config.optionSeparator);
  }
}
