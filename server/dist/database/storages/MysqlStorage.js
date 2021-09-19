import { Sequelize } from "Sequelize";
const connectionString = ``;
export default class MysqlStorage {
    constructor() {
        this.getOrders = async () => {
            const { rows, } = await this.pool.query(`SELECT * FROM orders`);
            return rows;
        };
        this.getWarehouses = async () => {
            const { rows } = await this.pool.query(`SELECT * FROM warehouses`);
            return rows;
        };
        this.pool = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
            host: config.HOST,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
    }
}
//# sourceMappingURL=MysqlStorage.js.map