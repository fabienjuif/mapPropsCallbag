const bodyParser = require('koa-body')
const Router = require('koa-router')
const Koa = require('koa')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router({ prefix: '/api' })

app.use(cors())
app.use(bodyParser({ multipart: true, urlencoded: true }))

const users = [
  'Florent',
  'Bénédicte',
  'Guillaume',
  'Wesley',
  'Fabien',
]
let loop = 0
router.get('/new-user', (ctx) => {
  ctx.body = { name: users[loop] }

  loop += 1
  if (loop >= users.length) {
    loop = 0
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080, () => {
  console.log('listen')
})
