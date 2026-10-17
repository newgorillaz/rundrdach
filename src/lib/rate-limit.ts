import { createHash } from "node:crypto";
const buckets = new Map<string, { count: number; reset: number }>();
export async function allowRequest(ip: string) {
  const key = "rundrdach:contact:" + createHash("sha256").update(ip).digest("hex").slice(0, 32);
  const endpoint = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (endpoint && token) {
    try {
      const response = await fetch(endpoint.replace(/\/$/, "") + "/pipeline", { method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify([["INCR", key], ["EXPIRE", key, "3600"]]), cache: "no-store" });
      if (!response.ok) return false;
      const result = await response.json();
      return typeof result[0]?.result === "number" && result[0].result <= 5;
    } catch { return false; }
  }
  const now = Date.now();
  // Local fallback. Configure a shared store for consistent limits across instances.
  for (const [entry, value] of buckets) if (value.reset <= now) buckets.delete(entry);
  if (buckets.size >= 1000 && !buckets.has(key)) return false;
  const current = buckets.get(key);
  if (!current || current.reset <= now) { buckets.set(key, { count: 1, reset: now + 3600000 }); return true; }
  current.count += 1;
  return current.count <= 5;
}
