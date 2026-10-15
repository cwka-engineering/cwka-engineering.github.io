// The pure half of the Box link sweep (kept import-free so it can be tested directly): which records get which URL.
export interface CandidateRun {
  id: string;
  filePath: string;
}

export type Resolver = (path: string) => Promise<string | null>;

// A resolver miss or error leaves the record for the next sweep; rows pointing at one file cost one lookup.
export async function planFileLinks(
  candidates: CandidateRun[],
  resolve: Resolver,
): Promise<{ id: string; url: string }[]> {
  const updates: { id: string; url: string }[] = [];
  const byPath = new Map<string, string | null>();
  for (const c of candidates) {
    let url = byPath.get(c.filePath);
    if (url === undefined) {
      try {
        url = await resolve(c.filePath);
      } catch (err) {
        console.error("box link lookup failed", String(err));
        url = null;
      }
      byPath.set(c.filePath, url);
    }
    if (url) updates.push({ id: c.id, url });
  }
  return updates;
}
