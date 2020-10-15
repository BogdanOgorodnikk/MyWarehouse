const Router = require('koa-router')
const { sequelize } = require('../database/db')
const router = new Router()

router.get('/api/profits', async ctx => {
    const profits = await sequelize.query(
        'SELECT warehouses.id, town, sum(price*count) AS profit FROM warehouses, orders WHERE (orders.warehouse_id = warehouses.id AND status=1) GROUP BY warehouses.id'
    )
    try {
        ctx.body = profits
    } catch (e) {
        ctx.body = e
    }
})


module.exports = router