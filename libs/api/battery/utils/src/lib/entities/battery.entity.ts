import { BatteryModel } from '@forprosjekt/shared/models';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('battery')
@ObjectType()
export class Battery implements BatteryModel {
  @Field(() => ID)
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
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
