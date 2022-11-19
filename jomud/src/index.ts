import { getCronRunner } from "./cron";
import { getHttpServer } from "./http";

getCronRunner().run();
getHttpServer().run();
