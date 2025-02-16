import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config";

interface EventTagAttributes {
    id: number;
    name: string;
    icon_url: string;
}
export interface EventTagInput extends Required<EventTagAttributes> { }
export interface EventTagOutput extends Required<EventTagAttributes> { }

export class EventTag extends Model<EventTagAttributes, EventTagInput> implements EventTagAttributes {
    public id!: number
    public name!: string
    public icon_url!: string
}

EventTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "EventTags",
        timestamps: false,
    }
);

export default EventTag;