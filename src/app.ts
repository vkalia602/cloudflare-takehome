let Koa = require("koa");
import koaBody from "koa-body";
import router from "./api/protected";

const app = new Koa();

// setup server
console.log("setting up server");
app.use(koaBody());

// x-response-time
app.use(async (ctx: any, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
/**
 * Error handling middleware
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

console.log("setting up routes");
app.use(router.routes());

export default app;
