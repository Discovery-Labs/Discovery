import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { BaseEntity } from '../../core/entities/BaseEntity';
import { Project } from '../Projects/Project.entity';
import { Quest } from '../Quests/Quest.entity';

export enum CourseEnum {
  BRANCHED = 'BRANCHED',
  DECRYPTED = 'DECRYPTED',
}

registerEnumType(CourseEnum, {
  name: 'CourseEnum',
  description:
    'Branched = theorical lessons and Decrypted = technical hands on lessons',
});

export type CeramicStreamId = string;
@ObjectType()
export class Course extends BaseEntity {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  gitbook: string;

  @Field()
  description: string;

  @Field(() => CourseEnum)
  type: CourseEnum;

  @Field(() => [Quest])
  quests: Quest[];

  @Field(() => [Project])
  projects?: Project[];
}
