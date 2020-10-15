const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'orders', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        count: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        },
        recipient_city: {
            type: Sequelize.STRING
        },
        warehouse_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'warehouses',
                key: 'id'
            }
        },
        owner_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        data: {
            type: Sequelize.DATE
        },
        product_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'products',
                key: 'id'
            }
        }
    },
    {
        timestamps: false
    }
)