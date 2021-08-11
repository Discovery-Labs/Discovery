import { ObjectType, Field } from '@nestjs/graphql';

export type CeramicStreamId = string;
@ObjectType()
export class Contributor {
  @Field()
  githubUsername: string;

  @Field(() => [String])
  projects?: CeramicStreamId[];

  @Field(() => [String])
  repos?: CeramicStreamId[];
}
