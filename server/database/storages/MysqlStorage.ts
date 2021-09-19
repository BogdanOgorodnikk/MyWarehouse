import {IStorage} from "../../interfaces/IStorage";
import {Sequelize} from "Sequelize";

export default class MysqlStorage implements IStorage {
    private pool:Sequelize;

    constructor() {
        this.pool = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
            host: config.HOST,
            dialect: 'mysql',
        
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        })
    }

    getOrders = async () => {
        const {
            rows,
        } = await this.pool.query(`SELECT * FROM orders`);
        return rows;
    };

    getWarehouses = async () => {
        const {rows} = await this.pool.query(
            `SELECT * FROM warehouses`
        );
        return rows;
    };
}