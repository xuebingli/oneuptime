import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import ColumnType from 'Common/Types/Database/ColumnType';
import ObjectID from 'Common/Types/ObjectID';
import BaseModel from 'Common/Models/BaseModel';
import ColumnLength from 'Common/Types/Database/ColumnLength';
import TableColumn from 'Common/Types/Database/TableColumn';
import User from './User';
import Project from './Project';
import TableColumnType from 'Common/Types/Database/TableColumnType';

@Entity({
    name: 'ProjectAPIKey',
})
export default class ProjectAPIKey extends BaseModel {
    @TableColumn({ type: TableColumnType.Entity, modelType: Project })
    @ManyToOne(
        (_type: string) => {
            return Project;
        },
        {
            cascade: false,
            eager: false,
            nullable: true,
            onDelete: 'CASCADE',
            orphanedRowAction: 'nullify',
        }
    )
    @JoinColumn({ name: 'projectId' })
    public project?: Project;

    @TableColumn({ type: TableColumnType.ObjectID })
    @Column({
        type: ColumnType.ObjectID,
        nullable: true,
        transformer: ObjectID.getDatabaseTransformer(),
    })
    public projectId?: ObjectID;

    @TableColumn({ type: TableColumnType.Entity, modelType: User })
    @ManyToOne(
        (_type: string) => {
            return User;
        },
        {
            cascade: false,
            eager: false,
            nullable: true,
            onDelete: 'CASCADE',
            orphanedRowAction: 'nullify',
        }
    )
    @JoinColumn({ name: 'deletedByUserId' })
    public deletedByUser?: User;

    @TableColumn({ type: TableColumnType.ObjectID })
    @Column({
        type: ColumnType.ObjectID,
        nullable: true,
        transformer: ObjectID.getDatabaseTransformer(),
    })
    public deletedByUserId?: ObjectID;

    @TableColumn({ type: TableColumnType.Entity, modelType: User })
    @ManyToOne(
        (_type: string) => {
            return User;
        },
        {
            eager: false,
            nullable: true,
            onDelete: 'CASCADE',
            orphanedRowAction: 'nullify',
        }
    )
    @JoinColumn({ name: 'createdByUserId' })
    public createdByUser?: User;

    @TableColumn({ type: TableColumnType.ObjectID })
    @Column({
        type: ColumnType.ObjectID,
        nullable: true,
        transformer: ObjectID.getDatabaseTransformer(),
    })
    public createdByUserId?: ObjectID;

    @Index()
    @TableColumn({ type: TableColumnType.ObjectID })
    @Column({
        type: ColumnType.ObjectID,

        nullable: false,
        transformer: ObjectID.getDatabaseTransformer(),
    })
    public apiKey?: ObjectID = undefined;

    @TableColumn({ type: TableColumnType.ShortText })
    @Column({
        type: ColumnType.ShortText,
        length: ColumnLength.ShortText,
        nullable: false,
    })
    public name?: string = undefined;

    @TableColumn({ required: true, type: TableColumnType.Date })
    @Column({
        nullable: false,
        type: ColumnType.Date,
    })
    public expires?: Date = undefined;
}
