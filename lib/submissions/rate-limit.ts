const attempts = new Map<string, number[]>();
export function acceptSubmission(key: string, now = Date.now()) { const recent = (attempts.get(key) ?? []).filter((at) => now - at < 60_000); if (recent.length >= 3) return false; recent.push(now); attempts.set(key, recent); return true; }
