const url = "https://adsiad.silverturk.com.tr/adsiad/yonetim-kurulu";
const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const html = await res.text();
const re = /<img[^>]+>/gi;
let m;
while ((m = re.exec(html))) {
  const tag = m[0];
  if (!/resimler|uye|kurul|foto|jpg/i.test(tag)) continue;
  const src = (tag.match(/src="([^"]+)"/) || [])[1];
  const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
  if (src && !/ikon|logo|menu/i.test(src)) console.log(alt || "-", src.split("/").pop());
}
