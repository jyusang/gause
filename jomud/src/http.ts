import Koa from "koa";

type HttpServer = {
  ref: Koa;
  run: () => void;
};

type HttpServerConfig = {
  port: number;
};

const getAppConfig = (config?: Partial<HttpServerConfig>): HttpServerConfig => {
  const { port = 3000 } = config ?? {};
  return {
    port,
  };
};

export const getHttpServer = (
  config?: Partial<HttpServerConfig>
): HttpServer => {
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
