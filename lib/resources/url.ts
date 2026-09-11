export function normalizeResourceUrl(value: string) {
  const url = new URL(value.trim());
  if (!/^https?:$/.test(url.protocol)) throw new Error("只支持 HTTP 或 HTTPS 网站");
  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase();
  url.hash = "";
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  return url.toString().replace(/\/$/, "");
}
