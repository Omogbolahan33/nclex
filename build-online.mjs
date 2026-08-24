/* Builds public/ — the served app WITHOUT answer keys (bank/cases stay server-side). */
import fs from "fs"; import path from "path"; import url from "url";
const root = new URL(".", import.meta.url).pathname;
const pub = path.join(root, "public");
fs.rmSync(pub, { recursive:true, force:true });
fs.mkdirSync(path.join(pub,"css"), { recursive:true });
fs.mkdirSync(path.join(pub,"js"), { recursive:true });
fs.copyFileSync(path.join(root,"css/app.css"), path.join(pub,"css/app.css"));
for (const f of ["taxonomy.js","engine.js","render.js","ui.js","api.js","notify.js","main.js"])
  fs.copyFileSync(path.join(root,"js",f), path.join(pub,"js",f));
// PWA: service worker (build-stamped cache name), manifest, icon
const STAMP = new Date().toISOString().replace(/[:.]/g,"-");
fs.writeFileSync(path.join(pub,"sw.js"),
  fs.readFileSync(path.join(root,"sw.js"),"utf8").replace(/__SW_STAMP__/g, STAMP));
fs.copyFileSync(path.join(root,"manifest.webmanifest"), path.join(pub,"manifest.webmanifest"));
fs.copyFileSync(path.join(root,"icon.svg"), path.join(pub,"icon.svg"));
let html = fs.readFileSync(path.join(root,"index.html"),"utf8");
html = html.replace(/<script src="js\/(bank\d*|bank|cases?3?|case[3-6])\.js"><\/script>\n?/g, ""); // strip every content file
fs.writeFileSync(path.join(pub,"index-app.html"), html);
const { contentFiles } = await import("./content.js");
const bankSize = contentFiles(process.cwd()).all.map(p=>p.replace(/^js\//,""))
  .reduce((a,f)=>a+fs.statSync(path.join(root,"js",f)).size, 0);
console.log(`built public/ (key-free app). Content kept server-side: ${(bankSize/1024).toFixed(0)} KB of bank+cases NOT shipped to the browser.`);
