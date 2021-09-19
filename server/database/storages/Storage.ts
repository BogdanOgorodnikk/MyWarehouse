import MongoStorage from "./MongoStorage";
import MysqlStorage from "./MysqlStorage";
const MYSQL_INSTANCE = "MYSQL_INSTANCE";

export default class Storage {
    public storage;

    constructor(instanceType:string) {
        this.storage = instanceType === MYSQL_INSTANCE ? new MysqlStorage() : new MongoStorage();
    }
}