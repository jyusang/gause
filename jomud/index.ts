import Koa from 'koa';

const app = new Koa();
const port = 3000;

app.use(async ctx => {
  ctx.body = 'Hello World';
});

console.log(`Listening port ${port}...`);
app.listen(port);

