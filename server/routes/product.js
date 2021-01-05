const Router = require('koa-router')
const router = new Router()
const Product = require('../models/Product')
const Warehouse = require('../models/Warehouse')

router.get('/api/products/:id', async ctx => {
    const id = ctx.params.id
    const products = await Product.findAll({
        where: {
            warehouse_id: id
        }
    })
     try {
        ctx.body = products
     } catch (e) {
        ctx.body = e
     }
})

router.post('/api/product/:id', async ctx => {
    const id = ctx.params.id
    const { title, characteristic, count, price } = ctx.request.body;

    const warehouse = await Warehouse.findOne({
        where: {
           id: id 
        }
    })

    if(!title || !characteristic || !count || !price) {
        return ctx.status = 400
    } else if(!warehouse) {
        ctx.status = 404
    } else {
        try {
            const product = await Product.create({
                title,
                characteristic,
                count,
                price,
                warehouse_id: id
            })
            ctx.body = product
        } catch (e) {
            ctx.body = e
        }
    }
})

router.put('/api/product/:id', async ctx => {
    const id = ctx.params.id
    const { title, characteristic, count, price } = ctx.request.body;

    if(!title || !characteristic || !count || !price) {
        ctx.status = 400
    } else {
        try {
            const product = await Product.update(
                {title, characteristic, count, price },
                {where: {id: id}
            })
            ctx.body = product
        } catch (e) {
            ctx.body = e
        }
    }
})

router.put('/api/product/number/:id', async ctx => {
    const id = ctx.params.id
    const {count} = ctx.request.body;
    
    if(count < 0) {
        ctx.status = 400
    } else {
        const product = await Product.update(
            {count},
            {where: {id: id}
        })    
        try {
            ctx.body = product
        } catch (e) {
            ctx.body = e
        }
    }
})

router.delete('/api/product/:id', async ctx => {
    const id = ctx.params.id

    const product = await Product.destroy(
        {where: {id: id}
    })
    try {
        ctx.body = product
    } catch (e) {
        ctx.body = e
    }
})


module.exports = router