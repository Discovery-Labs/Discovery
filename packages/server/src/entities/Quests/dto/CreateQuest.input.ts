import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsDefined, IsNotEmpty, IsArray } from 'class-validator';
import { Question } from './Question';

@InputType()
export class CreateQuestInput {
  @Field()
  @IsString({ message: 'wrong.type' })
  @IsDefined({ message: 'not.defined' })
  @IsNotEmpty({ message: 'not.empty' })
  courseId: string;

  @Field()
  @IsString({ message: 'wrong.type' })
  @IsDefined({ message: 'not.defined' })
  @IsNotEmpty({ message: 'not.empty' })
  name: string;

  @Field()
  @IsString({ message: 'wrong.type' })
  @IsDefined({ message: 'not.defined' })
  @IsNotEmpty({ message: 'not.empty' })
  description: string;

  @Field(() => [Question])
  @IsArray({ message: 'wrong.type' })
  @IsDefined({ message: 'not.defined' })
  @IsNotEmpty({ message: 'not.empty' })
  questions: Question[];

  @Field(() => [String])
  @IsArray({ message: 'wrong.type' })
  preRequisites?: string[];
}
