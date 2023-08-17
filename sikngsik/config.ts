import dotenv from "dotenv";

dotenv.config();

const throwMissingEnvVar = (name: string) => {
  throw Error(`Missing required env var: ${name}`);
};

const getEnvVarWithFallback = (name: string, fallback: string) => {
  return process.env[name] || fallback;
};

const getEnvVar = (name: string) => {
  return process.env[name] ?? throwMissingEnvVar(name);
};

export const config = {
  botToken: getEnvVar("BOT_TOKEN"),
  chatId: getEnvVar("CHAT_ID"),
  crontab: getEnvVarWithFallback("CRONTAB", "* * * * *"),
  optionSeparator: getEnvVar("OPTION_SEPARATOR"),
  options: getEnvVar("OPTIONS"),
  question: getEnvVar("QUESTION"),
};
