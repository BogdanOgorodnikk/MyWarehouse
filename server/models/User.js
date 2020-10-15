const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'users', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        },
        allow: {
            type: Sequelize.BOOLEAN
        },
        ban: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false
    }
)