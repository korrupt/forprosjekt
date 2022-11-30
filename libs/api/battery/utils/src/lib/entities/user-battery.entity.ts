import { CoreEntity } from '@forprosjekt/api/database/utils';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Battery } from './battery.entity';
import { User } from '@forprosjekt/api/user/utils';
import { CRUD } from '@forprosjekt/shared/models';

@Entity('user_battery')
export class UserBattery extends CoreEntity {
  @Column()
  batteryId: string;

  @ManyToOne(() => Battery, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'batteryId' })
  battery: Battery;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: CRUD, enumName: 'Permissions', array: true, default: [] })
  permissions: CRUD[];
}
