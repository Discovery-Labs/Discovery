import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RedisModule } from '../../core/resources/Redis/Redis.module';

import { GetAllCoursesResolver } from './queries/GetAllCourses.resolver';
import { CreateCourseResolver } from './mutations/CreateCourse.resolver';

@Module({
  imports: [
    RedisModule,
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 10,
    }),
  ],
  providers: [GetAllCoursesResolver, CreateCourseResolver],
  exports: [],
})
export class CourseModule {}
