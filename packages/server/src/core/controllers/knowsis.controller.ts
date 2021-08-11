import { Controller, Get, Req } from '@nestjs/common';
import { Context } from '../utils/security/types';
import { idxAliases } from '../constants/idx';
@Controller('knowsis')
export class KnowsisController {
  @Get('/contributors')
  async findAllContributors(@Req() request: Context['req']): Promise<any> {
    const contributors = await request.ceramicClient.idx.get(
      idxAliases.IDX_CONTRIBUTORS_ALIAS,
    );

    return { contributors };
  }
}
