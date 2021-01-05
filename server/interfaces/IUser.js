class IUser {
    constructor(id, email, password, name, phone, isAdmin, allow, ban) {
        this.id = id, 
        this.email = email, 
        this.password = password, 
        this.name = name, 
        this.phone = phone
        this.isAdmin = isAdmin,
        this.allow = allow,
        this.ban = ban
    }
}

module.exports = IUser;