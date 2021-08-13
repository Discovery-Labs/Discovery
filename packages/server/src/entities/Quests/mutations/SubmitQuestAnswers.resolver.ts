import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { compareHash } from '../../../core/utils/security/hash';
import { Ceramic } from '../../../core/utils/security/types';
import { QuestAnswersSubmitionInput } from '../dto/QuestAnswersSubmition.input';
import { Question } from '../dto/Question';

@Resolver(() => Boolean)
export class SubmitQuestAnswersResolver {
  @Mutation(() => Boolean, {
    nullable: false,
    description: 'Submits quest answers',
    name: 'submitQuestAnswers',
  })
  async submitQuestAnswers(
    @UseCeramicClient() ceramicClient: Ceramic,
    @Args('input') answerSubmition: QuestAnswersSubmitionInput,
  ): Promise<boolean> {
    const quest = await ceramicClient.ceramic.loadStream(
      answerSubmition.questId,
    );
    const questions = quest.state.content.questions;
    const submittedHashedAnswers = await Promise.all(
      answerSubmition.questionAnswers.map(async (qa) => {
        const rightHashedAnswer = questions.find(
          (question: Question) => question.question === qa.question,
        ).answer;
        const isRight = await compareHash(qa.answer, rightHashedAnswer);
        return isRight;
      }),
    );
    const isSuccess = submittedHashedAnswers.every((result) => result);
    return isSuccess;
  }
}
