const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar/aa', function (ctx, next) {
  ctx.body = 'this is a users/bar/aa response'
})

module.exports = router
