import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { createCeramicDocument } from '../../../services/ceramic/ceramic.service';
import { CreateProjectInput } from '../dto/CreateProject.input';
import { Project } from '../Project.entity';

@Resolver(() => Project)
export class CreateProjectResolver {
  @Mutation(() => Project, {
    nullable: true,
    description: 'Create a new Project in Discovery',
    name: 'createProject',
  })
  async createProject(
    @UseCeramicClient() ceramicClient: Ceramic,
    @Args('input') { name, description, github }: CreateProjectInput,
  ): Promise<Project | null | undefined> {
    const createdProject = await createCeramicDocument(ceramicClient, {
      data: { name, description, github },
      family: 'project',
      schema: ceramicClient.schemasCommitId['project'],
    });
    if (!createdProject) {
      return null;
    }
    await ceramicClient.idx.set('project', createdProject.doc.content);
    await ceramicClient.idx.set('projects', {
      references: [createdProject.doc.id.toString()],
    });
    return createdProject.doc.content;
  }
}
