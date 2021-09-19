import IOrder from './IOrder'
import IProduct from './IProduct'
import IWarehouse from './IWarehouse'

export interface IStorage {


    getOrders:() => Promise<IOrder[]>;

    getWarehouses:() => Promise<IWarehouse[]>;
}