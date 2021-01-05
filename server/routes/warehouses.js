const Router = require('koa-router')
const router = new Router()
const { sequelize } = require('../database/db')
const Warehouse = require('../models/Warehouse')

router.get('/api/warehouses', async ctx => {
    const warehouse = await Warehouse.findAll()
    const amountproduct = await sequelize.query(
        'SELECT warehouses.id, sum(price*count) as amountproduct FROM warehouses, products WHERE (products.warehouse_id = warehouses.id) GROUP BY warehouses.id'
    )

     try {
        return ctx.body = {
            warehouse,
            amountproduct
        }
     } catch (e) {
        ctx.body = e
     }
})

router.post('/api/warehouse', async ctx => {
    const {town, region, rent } = ctx.request.body;
    if(!town || !region) {
        ctx.status = 400
    } else {
        const warehouse = await Warehouse.create({
            town,
            region,
            rent
        })
        try {
            ctx.body = warehouse
        } catch (e) {
            ctx.body = e
        }
    }
})

router.delete('/api/warehouse/:id', async ctx => {
    const warehouse = await Warehouse.destroy({
        where: {
            id: ctx.params.id
        }
    })
    try {
        ctx.body = warehouse
    } catch (e) {
        ctx.body = e
    }
})

router.put('/api/warehouse/:id', async ctx => {
    const {town, region, rent} = ctx.request.body;
    if(!town || !region || !rent) {
        ctx.status = 400
    } else {
        const warehouse = await Warehouse.update(
            {town, region, rent},
            {where: {id: ctx.params.id}})
        try {
            ctx.body = warehouse
        } catch (e) {
            ctx.body = e
        }
    }
})

module.exports = router