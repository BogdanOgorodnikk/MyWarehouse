const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'products', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        characteristic: {
            type: Sequelize.STRING
        },
        count: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        warehouse_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'warehouses',
                key: 'id'
            }
        }
    },
    {
        timestamps: false
    }
)