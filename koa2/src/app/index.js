const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const userRouter = require('../router/user.route');

const app = new Koa();
app.use(koaBody());

const indexRouter = new Router();
indexRouter.get('/', (ctx, next) => {
  ctx.body = 'Hello Index';
});
app.use(indexRouter.routes());
app.use(userRouter.routes());

module.exports = app;
