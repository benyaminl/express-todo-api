import { Database } from "../connection";
import { DataTypes, Model } from 'sequelize';

export class Task extends Model {
    declare id: number;
    declare name: string;
    declare content: string;
    declare user: string;
}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.STRING,
    },
    user: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: Database.connection()
});
