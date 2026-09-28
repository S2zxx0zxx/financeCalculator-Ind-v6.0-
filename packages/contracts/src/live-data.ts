export type LiveDataStatus = "fresh" | "stale" | "unavailable";

export interface DataSourceRef {
  id: string;
  name: string;
  url: string;
}

export interface LiveDataEnvelope<T> {
  key: string;
  value: T | null;
  unit?: string;
  source: DataSourceRef;
  asOf: string | null;
  fetchedAt: string;
  staleAfter: string;
  status: LiveDataStatus;
}

export function classifyFreshness(
  asOf: string | null,
  staleAfter: string,
  now = new Date()
): LiveDataStatus {
  if (!asOf || Number.isNaN(Date.parse(asOf)) || Number.isNaN(Date.parse(staleAfter))) return "unavailable";
  return now.getTime() <= Date.parse(staleAfter) ? "fresh" : "stale";
}

export function createLiveDataEnvelope<T>(input: Omit<LiveDataEnvelope<T>, "status">): LiveDataEnvelope<T> {
  return {
    ...input,
    status: input.value === null ? "unavailable" : classifyFreshness(input.asOf, input.staleAfter, new Date(input.fetchedAt))
  };
}
