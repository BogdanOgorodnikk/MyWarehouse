const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'warehouses', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        town: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        rent: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)