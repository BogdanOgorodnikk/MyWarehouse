class IOrder {
    constructor(id, title, count, price, status, recipient_city, warehouse_id, owner_id, data, product_id) {
        this.id = id, 
        this.title = title, 
        this.count = count, 
        this.price = price, 
        this.status = status, 
        this.recipient_city = recipient_city, 
        this.warehouse_id = warehouse_id, 
        this.owner_id = owner_id, 
        this.data = data, 
        this.product_id = product_id 
    }
}

module.exports = IOrder;