import { Sequelize } from "sequelize"

import 'dotenv/config'
import { Env } from "./env";

export class Database {
    
    private static conn : Sequelize;

    /**
     * Single Instance Sequelize
     * @returns {Sequelize}
     */
    public static connection() {
        let conf = <Env> (<unknown> process.env);
        if (Database.conn == null)
            console.log(conf);
            Database.conn = new Sequelize(conf.DB_NAME, conf.DB_USER, conf.DB_PASSWORD, {
                host: conf.DB_HOST,
                dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
                port: conf.DB_PORT
              });
        
        return Database.conn;
    }
}