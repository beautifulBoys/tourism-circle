const router = require('koa-router')()
// import data from './data.js';
const data = require('./data.js');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/string', async (ctx, next) => {
  ctx.body = data;
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
