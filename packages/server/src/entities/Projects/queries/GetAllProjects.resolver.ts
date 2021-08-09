import { Resolver, Query } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { Project } from '../Project.entity';

@Resolver(() => [Project])
export class GetAllProjectsResolver {
  @Query(() => [Project], {
    nullable: true,
    description: 'Gets all the projects in Discovery',
    name: 'getAllProjects',
  })
  async getAllProjects(
    @UseCeramicClient() ceramicClient: Ceramic,
  ): Promise<Project[] | null | undefined> {
    console.log(await ceramicClient.idx.get('projects'));
    return undefined;
  }
}
