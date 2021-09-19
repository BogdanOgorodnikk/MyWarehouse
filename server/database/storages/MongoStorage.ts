import {MongoClient} from 'mongodb';
import IOrder from "../../interfaces/IOrder";
import IWarehouse from "../../interfaces/IWarehouse";
import {IStorage} from "../../interfaces/IStorage";

export default class MongoStorage implements IStorage{
    private readonly pool;

    constructor() {
        this.pool = new MongoClient("").connect();
    }

    getOrders = async () => {
        return this.pool.then(async (orders) => {
            const db = orders.db('MyWarehouse');
            const collection = db.collection("Orders");
            return await collection.find().toArray();
        });
    };

    getWarehouses = async () => {
        return this.pool.then(async (orders) => {
            const db = orders.db('MyWarehouse');
            const collection = db.collection("Warehouses");
            return await collection.find().toArray();
        });
    };

}