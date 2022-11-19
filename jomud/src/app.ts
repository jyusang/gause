import Koa from "koa";

type App = {
  ref: Koa;
  run: () => void;
};

type AppConfig = {
  port: number;
};

const getAppConfig = (config?: Partial<AppConfig>): AppConfig => {
  const { port = 3000 } = config ?? {};
  return {
    port,
  };
};

export const getNewApp = (config?: Partial<AppConfig>): App => {
  const { port } = getAppConfig(config);
  const ref = new Koa();
  ref.use(async (ctx) => {
    const {
      request: { method, path },
    } = ctx;
    const now = new Date();
    ctx.body = `${now.toISOString()}: ${method} ${path}`;
  });
  return {
    ref,
    run() {
      console.log(`Listening port ${port}...`);
      ref.listen(port);
    },
  };
};
