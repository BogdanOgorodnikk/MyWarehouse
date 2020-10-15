const Koa = require('koa')
const bodyParser = require('koa-body')
const session = require('koa-session')
const json = require("koa-json")
const config = require('./config');

const auth = require('./routes/auth')
const warehouses = require('./routes/warehouses')
const user = require('./routes/user')
const product = require('./routes/product')
const order = require('./routes/order')
const profit = require('./routes/profit')

const app = new Koa()
app.use(bodyParser())
app.use(json())

app.use(auth.routes())
app.use(warehouses.routes())
app.use(user.routes())
app.use(product.routes())
app.use(order.routes())
app.use(profit.routes())


app.use(session(app))

app.listen(config.PORT, () => {
    console.log(`Server listening on port: ${config.PORT}`)
})