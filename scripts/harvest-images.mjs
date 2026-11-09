import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const pages = [
  "https://adsiad.silverturk.com.tr/",
  "https://adsiad.silverturk.com.tr/adsiad/yonetim-kurulu",
  "https://adsiad.silverturk.com.tr/adsiad/denetim-kurulu",
  "https://adsiad.silverturk.com.tr/adsiad/yuksek-danisma-kurulu",
  "https://adsiad.silverturk.com.tr/adsiad/onur-kurulu",
  "https://adsiad.silverturk.com.tr/uyeler",
  "https://adsiad.silverturk.com.tr/adsiad/haberler",
  "https://adsiad.silverturk.com.tr/projeler",
  "https://adsiad.silverturk.com.tr/adsiad/baskanin-mesaji",
  "https://adsiad.silverturk.com.tr/adsiad/haberler/disa-acik-piyasa-ekonomisi-cukurova8217yi-hareketlendirir",
];

const skip = /\/ikonlar\/|cute-theme|facebook\.png|twitter\.png|\/javalar\/|hizli-menu|ust\/adsiad-logo|alt-logo|\/reklamlar\/|silverturk\.png/i;
const found = new Set();

for (const url of pages) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const matches = html.match(/[^"'\\\s>]+\.(?:jpg|jpeg|png|JPG|JPEG|PNG)/g) || [];
  if (url.endsWith(".tr/")) console.log(matches.slice(0, 12).join("\n"));
  for (const m of matches) {
    if (!skip.test(m)) found.add(m.split("?")[0]);
  }
  console.log(url, matches.length);
}

const list = [...found];
console.log("keep", list.length);
await mkdir("public/archive", { recursive: true });
await writeFile("scripts/image-urls.json", JSON.stringify(list, null, 2));

let n = 0;
for (const url of list) {
  const name = decodeURIComponent(url.split("/").pop()).replace(/[^\w.\-]+/g, "_");
  const folder = url.includes("/haberler/") ? "news" : url.includes("/promo/") ? "promo" : "other";
  await mkdir(path.join("public/archive", folder), { recursive: true });
  const dest = path.join("public/archive", folder, name);
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    console.log("fail", res.status, url);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  n += 1;
  console.log(folder, name, buf.length);
}
console.log("saved", n);
