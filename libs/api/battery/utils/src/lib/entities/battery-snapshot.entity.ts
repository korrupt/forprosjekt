import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Battery } from './battery.entity';
import { GraphQLJSON } from 'graphql-type-json';

@Entity()
@ObjectType()
export class BatterySnapshot {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  time: Date;

  @Column({ type: 'jsonb' })
  @Field(() => GraphQLJSON)
  data: JSON;

  @Column()
  @Field(() => ID)
  batteryId: string;

  @ManyToOne(() => Battery, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'batteryId' })
  battery: Battery;
}
