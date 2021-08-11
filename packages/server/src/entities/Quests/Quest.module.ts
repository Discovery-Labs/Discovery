import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RedisModule } from '../../core/resources/Redis/Redis.module';

import { GetAllQuestsResolver } from './queries/GetAllQuests.resolver';
import { CreateQuestResolver } from './mutations/CreateQuest.resolver';

@Module({
  imports: [
    RedisModule,
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 10,
    }),
  ],
  providers: [GetAllQuestsResolver, CreateQuestResolver],
  exports: [],
})
export class QuestModule {}
