import { ObjectType, Field } from '@nestjs/graphql';

export type CeramicStreamId = string;
@ObjectType()
export class Quest {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  courseId: CeramicStreamId;

  @Field(() => [String])
  completedBy?: CeramicStreamId[];
}
