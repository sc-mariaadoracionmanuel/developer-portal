import { buildSearchQuery } from "./search/queries";
import { QuerySearchApi } from "./search/searchAPI";
import { ChangeLogSearchFacet, QuerySearchApiResult } from "./search/types";

export type SearchChangeLogParams = {
  path: string;
  limit?: number;
  offset?: number;
  uuid?: string;
  facets: ChangeLogSearchFacet[]
}

export default async function SearchChangeLog({ path, limit = 10, offset = 0, uuid, facets }: SearchChangeLogParams): Promise<QuerySearchApiResult> {
  const query = buildSearchQuery({ path, limit, offset, uuid, facets });
  return await QuerySearchApi({ query });
}