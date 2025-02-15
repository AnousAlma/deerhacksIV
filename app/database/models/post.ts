import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config";

interface EventPostAttributes {
    id: number;
    title: string;
    description: string;
    location: string;
    eventDate: Date;
    createdAt?: Date;
}
export interface EventPostInput extends Required<EventPostAttributes> { }
export interface EventPostOutput extends Required<EventPostAttributes> { }

export class EventPost extends Model<EventPostAttributes, EventPostInput> implements EventPostAttributes {
    public id!: number
    public title!: string
    public description!: string
    public location!: string
    public eventDate!: Date;

    public readonly createdAt!: Date;
}

EventPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        eventDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "EventPosts",
        timestamps: true,
    }
);

export default EventPost;