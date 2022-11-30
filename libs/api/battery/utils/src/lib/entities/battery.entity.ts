import { CoreEntity } from '@forprosjekt/api/database/utils';
import { BatteryModel } from '@forprosjekt/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@Entity('battery')
@ObjectType()
export class Battery extends CoreEntity implements BatteryModel {
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
}
