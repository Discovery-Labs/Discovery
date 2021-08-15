import { TileDocument } from '@ceramicnetwork/stream-tile';
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
    const questDoc = (await TileDocument.load(
      ceramicClient.ceramic,
      answerSubmition.questId,
    )) as any;
    if (!questDoc) {
      return false;
    }
    const questions = questDoc.content.questions;
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
    if (isSuccess) {
      const alreadyCompletedBy = questDoc.content.completedBy ?? [];
      const isAlreadyCompletedByUser = questDoc.content.completedBy.some(
        (user: string) => user === answerSubmition.did,
      );
      if (isAlreadyCompletedByUser) return false;
      await questDoc.update({
        id: questDoc.id.toUrl(),
        ...questDoc.content,
        completedBy: new Set([...alreadyCompletedBy, answerSubmition.did]),
      });
    }
    return isSuccess;
  }
}
