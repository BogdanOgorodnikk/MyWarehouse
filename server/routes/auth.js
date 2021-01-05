const Router = require('koa-router')
const router = new Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config');
const mailer = require('../nodemailer')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/api/register', async (ctx) => {
    try {
        const {email, password, name, phone} = ctx.request.body;

        const candidate = await User.findOne({
            where: {
                email: email
            }
        })

        const message = {
            from: "superpm7@gmail.com",
            to: email,
            subject: "Регистрация на MyWarehouse",
            html: `<b>Вы зарегистрировались на сайте MyWarehouse!</b>

            Данные от вашей учетной записи:
            <ul>
                <li> Логин: ${email} </li>
                <li> Пароль: ${password} </li>
            </ul>
            <p> В течение 24 часов, администрация проверит Ваш аккаунт и предоставит ему доступ к сайту, если Вы есть оптовиком нашей компании. </p>`
        }

        if(candidate) {
            return ctx.status = 400;
        } else {
            const hash = await bcrypt.hashSync(password, 10);
            mailer(message)
    
            await User.create({
                email, 
                password: hash, 
                name, 
                phone,})
            .then(data => {
                ctx.body = data
            })
            .catch(err => {
                ctx.body = 'error: ' + err
            })
        }
    } catch (e) {
        ctx.body = 'Task does not exist' + e
    }
})

router.post('/api/login', async (ctx) => {
    try {
        const {email, password} = ctx.request.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(!user) {
            return ctx.status = 404;
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if(!isPassValid) {
            return ctx.status = 400;
        }
        const token = jwt.sign({id: user.id, name: user.name}, config.SECRETKEY, {expiresIn: "1h"})
        return ctx.body = {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                isAdmin: user.isAdmin,
                allow: user.allow,
                ban: user.ban
            }
        }


    } catch (e) {
        ctx.body = 'Task does not exist' + e
    }
})

router.get('/api/auth', authMiddleware, async (ctx) => {
    try {
        const user = await User.findOne({
            where: {
                id: ctx.user.id
            }
        })
        const token = jwt.sign({id: user.id, name: user.name}, config.SECRETKEY, {expiresIn: "1h"})
        return ctx.body = {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                isAdmin: user.isAdmin,
                allow: user.allow,
                ban: user.ban
            }
        }
    } catch (e) {
        ctx.body = 'Task does not exist' + e
    }
})

module.exports = router