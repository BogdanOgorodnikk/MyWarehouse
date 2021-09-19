import { MongoClient } from 'mongodb';
export default class MongoStorage {
    constructor() {
        this.getOrders = async () => {
            return this.pool.then(async (orders) => {
                const db = orders.db('MyWarehouse');
                const collection = db.collection("Orders");
                return await collection.find().toArray();
            });
        };
        this.getWarehouses = async () => {
            return this.pool.then(async (orders) => {
                const db = orders.db('MyWarehouse');
                const collection = db.collection("Warehouses");
                return await collection.find().toArray();
            });
        };
        this.pool = new MongoClient("").connect();
    }
}
//# sourceMappingURL=MongoStorage.js.map