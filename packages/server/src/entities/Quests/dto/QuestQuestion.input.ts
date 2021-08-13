import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsDefined, IsNotEmpty, IsArray } from 'class-validator';

@InputType()
export class QuestQuestionInput {
  @Field()
  @IsString({ message: 'wrong.type' })
  @IsDefined({ message: 'not.defined' })
  @IsNotEmpty({ message: 'not.empty' })
  question: string;

  @Field(() => [String])
  @IsArray({ message: 'wrong.type' })
  @IsDefined({ message: 'not.defined' })
  @IsNotEmpty({ message: 'not.empty' })
  choices: string[];

  @Field()
  @IsString({ message: 'wrong.type' })
  @IsDefined({ message: 'not.defined' })
  @IsNotEmpty({ message: 'not.empty' })
  answer: string;
}
