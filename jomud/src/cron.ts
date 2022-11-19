import { schedule } from "node-cron";

type CronRunner = {
  ref: undefined;
  run: () => void;
};

type CronRunnerConfig = {};

const getCronRunnerConfig = (
  config?: Partial<CronRunnerConfig>
): CronRunnerConfig => {
  const {} = config ?? {};
  return {};
};

export const getCronRunner = (
  config?: Partial<CronRunnerConfig>
): CronRunner => {
  const {} = getCronRunnerConfig(config);
  const jobs = [
    {
      rule: "1,2,4,5 * * * * *",
      handler() {
        console.log("running every second 1, 2, 4 and 5");
      },
    },
  ];
  return {
    ref: undefined,
    run() {
      jobs.forEach((job) => {
        schedule(job.rule, job.handler);
      });
      console.log(`${jobs.length} cron jobs scheduled.`);
    },
  };
};
