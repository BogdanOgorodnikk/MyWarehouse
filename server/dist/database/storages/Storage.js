import MongoStorage from "./MongoStorage";
import MysqlStorage from "./MysqlStorage";
const MYSQL_INSTANCE = "MYSQL_INSTANCE";
export default class Storage {
    constructor(instanceType) {
        this.storage = instanceType === MYSQL_INSTANCE ? new MysqlStorage() : new MongoStorage();
    }
}
//# sourceMappingURL=Storage.js.map