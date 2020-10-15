const Router = require('koa-router')
const router = new Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.put('/api/useredit/:id', async ctx => {
    const {email, password, name, phone} = ctx.request.body;
    
    const candidate = await User.findOne({
        where: {
            email: email
        }
    })

    if(candidate) {
        return ctx.status = 400
    } else if(!email || !password || !name || !phone) {
        ctx.body = {
            error: 'Bad Data'
        }
    } else {
        const hash = await bcrypt.hashSync(password, 10);
        const user = await User.update(
            {email, password: hash, name, phone},
            {where: {id: ctx.params.id}})
        try {
            ctx.body = user
        } catch (e) {
            ctx.body = e
        }
    }
})

router.get('/api/allusers', async ctx => {
    const allusers = await User.findAll()
    try {
        ctx.body = allusers
    } catch (e) {
        ctx.body = e
    }
})

router.put('/api/allusers/:id', async ctx => {
    const {isAdmin, allow, ban} = ctx.request.body

    const candidate = await User.findAll({
        where: {
            isAdmin: true
        }
    })

    if(!candidate) {
        ctx.status = 404
    } else {
        const user = await User.update(
        {isAdmin, allow, ban},
        {where: {id: ctx.params.id}})
        try {
            ctx.body = user
        } catch (e) {
            ctx.body = e
        }   
    }
})

module.exports = router