import { Request, Response } from 'express';
import { ExecutionParams } from 'subscriptions-transport-ws';
import CeramicClient from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';

export interface Context {
  req: {
    session: any;
    ceramicClient: Ceramic;
  } & Request;
  res: Response;
  connection: ExecutionParams;
}

export interface Ceramic {
  ceramic: CeramicClient;
  idx: IDX;
  aliases: Record<string, string>;
}

export interface RateLimitOptionsType {
  max: number;
  windowMs: number;
  limitByVariables: boolean;
  errorMessage: string;
}
