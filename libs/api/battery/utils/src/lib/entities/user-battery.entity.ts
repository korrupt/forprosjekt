import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Battery } from './battery.entity';
import { User } from '@forprosjekt/api/user/utils';
import { BatteryManagerType, UserBatteryModel } from '@forprosjekt/shared/models';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('user_battery')
@ObjectType()
export class UserBattery implements UserBatteryModel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => ID)
  batteryId: string;

  @ManyToOne(() => Battery, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'batteryId' })
  battery: Battery;

  @Column()
  @Field(() => ID)
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: BatteryManagerType, enumName: 'BatteryManagerType' })
  @Field(() => String)
  type: BatteryManagerType;
}
