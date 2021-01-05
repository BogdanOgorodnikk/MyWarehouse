const Router = require('koa-router')
const router = new Router()
const Order = require('../models/Order')
const Warehouse = require('../models/Warehouse')
const User = require('../models/User')
const Product = require('../models/Product')

router.get('/api/orders/:owner', async ctx => {
    const owner_id = ctx.params.owner;
    
    const order = await Order.findAll({
        where: {
            owner_id: owner_id
        }
    })
    const warehouse = await Warehouse.findAll()
    try {
        return ctx.body = {
            order,
            warehouse
        }
    } catch (e) {
        ctx.body = e
    }
})

router.get('/api/orders', async ctx => {
    const order = await Order.findAll()
    const warehouse = await Warehouse.findAll()
    try {
        return ctx.body = {
            order,
            warehouse
        }
    } catch (e) {
        ctx.body = e
    }
})

router.post('/api/order/:warehouse/:owner/:product', async ctx => {
    const warehouse_id = ctx.params.warehouse;
    const owner_id = ctx.params.owner;
    const product_id = ctx.params.product;
    const {title, count, price, recipient_city, data} = ctx.request.body;

    const warehouse = await Warehouse.findOne({
        where: {
            id: warehouse_id
        }
    })
    const owner = await User.findOne({
        where: {
            id: owner_id
        }
    })
    const product = await Product.findOne({
        where: {
            id: product_id
        }
    })

    if(!title || !count || !price || !recipient_city || !data) {
        ctx.status = 400
    } else if(!warehouse) {
        ctx.status = 404
    } else if (!owner) {
        ctx.status = 404
    } else if(!product) {
        ctx.status = 404
    }else {
        const order = await Order.create({
            title,
            count, 
            price, 
            status: 0, 
            recipient_city, 
            warehouse_id: warehouse_id,
            owner_id: owner_id,
            data,
            product_id: product_id
        })
        try {
            ctx.body = order
        } catch (e) {
            ctx.body = e
        }
    }
})

router.put('/api/order/:id/:product', async ctx => {
    const id = ctx.params.id;
    const product_id = ctx.params.product;
    const {status, counts} = ctx.request.body;

    if(status == 2) {
        const findproduct = await Product.findOne({
            where: {
                id: product_id
            }
        })

    await Product.update(
            {count: +findproduct.count + +counts},
            {where: {
                id: product_id}
            }
        )
    }

    try {
        const order = await Order.update(
            {status},
            {where: {id: id}
        })
        ctx.body = order
    } catch (e) {
        ctx.body = e
    }
})

module.exports = router