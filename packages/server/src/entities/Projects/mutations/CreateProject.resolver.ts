import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseCeramicClient } from '../../../core/decorators/UseCeramicClient.decorator';
import { Ceramic } from '../../../core/utils/security/types';
import { createCeramicDocument } from '../../../services/ceramic/ceramic.service';
import { CreateProjectInput } from '../dto/CreateProject.input';
import { Project } from '../Project.entity';

export type ProjectItem = {
  id: string;
  name: string;
};

export type ProjectsList = { projects: Array<ProjectItem> };
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
    console.log('PROJECT CREATED');

    await ceramicClient.idx.set('project', createdProject.doc.content);
    console.log('INDEX PROJECT SET');

    const existingProjects = await ceramicClient.idx.get<ProjectsList>(
      'projects',
    );
    console.log('existingProjects', existingProjects);

    const projects = existingProjects?.projects ?? [];
    await ceramicClient.idx.set('projects', {
      projects: [{ id: createdProject.doc.id.toUrl(), name }, ...projects],
    });
    console.log('PROJECTS IDX SET');

    // const createdProjects = await createCeramicDocument(ceramicClient, {
    //   data: { references: [createdProject.streamId] },
    //   family: 'projects',
    //   schema: ceramicClient.schemasCommitId['projects'],
    // });
    return createdProject.doc.content;
  }
}
