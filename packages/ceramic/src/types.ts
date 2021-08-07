import { CommitID } from "@ceramicnetwork/streamid";

export type CreateCeramicDocumentInput = {
  data: any;
  family: string | undefined;
  schema: string | CommitID | undefined;
}