import Storage from "./storages/Storage";
const MYSQL_INSTANCE = "MYSQL_INSTANCE";

export const {storage} = new Storage(MYSQL_INSTANCE);