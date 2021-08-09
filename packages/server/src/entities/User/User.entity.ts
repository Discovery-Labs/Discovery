import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  did: string;

  @Field(() => [String])
  ethAddresses: string[];

  @Field(() => Boolean, { defaultValue: false })
  confirmed?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  restricted?: boolean;
}
