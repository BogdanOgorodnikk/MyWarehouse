export default interface IOrder {
    id: number,
    title: string,
    count: number,
    price: number,
    status: number,
    recipient_city: number, 
    warehouse_id: number, 
    owner_id: number, 
    data: string, 
    product_id: number
}