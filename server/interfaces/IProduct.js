class IProduct {
    constructor(id, title, characteristic, count, price, warehouse_id) {
        this.id = id, 
        this.title = title, 
        this.characteristic = characteristic, 
        this.count = count, 
        this.price = price
        this.warehouse_id = warehouse_id
    }
}

module.exports = IProduct;