import { BatteryModel } from '@forprosjekt/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('battery')
@ObjectType()
export class Battery implements BatteryModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  name: string;
  //TODO: make GEOJSON
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  longitude?: string;

  //TODO: make GEOJSON
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  latitude?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
