import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config";

interface EventPostAttributes {
    id: number;
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    ownerId?: string;
    discordUrl?: string;
    instagramUrl?: string;
    createdAt?: Date;
}
export interface EventPostInput extends Optional<EventPostAttributes, 'id' | 'createdAt' | 'ownerId' | 'discordUrl' | 'instagramUrl'> { }
export interface EventPostOutput extends Required<EventPostAttributes> { }

export class EventPost extends Model<EventPostAttributes, EventPostInput> implements EventPostAttributes {
    public id!: number
    public title!: string
    public description!: string
    public location!: string
    public startDate!: Date;
    public endDate!: Date;
    public ownerId!: string;
    public discordUrl!: string;
    public instagramUrl!: string;

    public readonly createdAt!: Date;
}

EventPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownerId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discordUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instagramUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "EventPosts",
        timestamps: true,
    }
);

export default EventPost;