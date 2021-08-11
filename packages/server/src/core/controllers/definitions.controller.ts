import { Controller, Get, Req } from '@nestjs/common';
import { Context } from '../utils/security/types';
@Controller('definitions')
export class DefinitionsController {
  @Get()
  async findAllDefinitions(@Req() request: Context['req']): Promise<any> {
    const definitions = await Promise.all(
      Object.values(request.ceramicClient.idx._aliases).map(
        async (definitionId) =>
          request.ceramicClient.idx.getDefinition(definitionId),
      ),
    );
    return { definitions };
  }
}
