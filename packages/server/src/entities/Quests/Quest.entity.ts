import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../core/entities/BaseEntity';
import { QuestNFT } from './dto/QuestNFT';
import { Question } from './dto/Question';

export type CeramicStreamId = string;
@ObjectType()
export class Quest extends BaseEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  courseId: CeramicStreamId;

  @Field(() => [String])
  completedBy?: CeramicStreamId[];

  @Field(() => [QuestNFT])
  nfts?: QuestNFT[];

  @Field(() => [Question])
  questions: Question[];
}
