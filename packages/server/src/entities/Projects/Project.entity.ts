import { ObjectType, Field } from '@nestjs/graphql';
import { Website } from './dto/WebSite';

export type CeramicStreamId = string;
@ObjectType()
export class Project {
  @Field()
  name: string;

  @Field()
  whitepaper?: string;

  @Field(() => [Website])
  websites?: Website[];

  @Field()
  twitter?: string;

  @Field()
  discord?: string;

  @Field()
  github: string;

  @Field()
  description: string;

  @Field()
  logo?: string;

  @Field()
  contract_address?: string;

  @Field(() => Boolean)
  is_featured?: boolean;

  @Field(() => [String])
  categories?: CeramicStreamId[];

  @Field(() => [String])
  repos?: CeramicStreamId[];

  @Field(() => [String])
  peerProjects?: CeramicStreamId[];
}
