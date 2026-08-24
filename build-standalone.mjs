/* Bundles the app into one self-contained HTML file (no network needed). Usage: node build-standalone.mjs */
import fs from "fs"; import path from "path";
const root = new URL(".", import.meta.url).pathname;
let html = fs.readFileSync(path.join(root,"index.html"),"utf8");
html = html.replace(/<link rel="stylesheet" href="css\/app.css">/,
  () => "<style>\n"+fs.readFileSync(path.join(root,"css/app.css"),"utf8")+"\n</style>");
html = html.replace(/<script src="js\/([a-z0-9]+\.js)"><\/script>/g, (m,f) =>
  "<script>\n"+fs.readFileSync(path.join(root,"js",f),"utf8")+"\n</script>");
fs.writeFileSync(path.join(root,"standalone.html"), html);
console.log("built standalone.html:", (fs.statSync(path.join(root,"standalone.html")).size/1024).toFixed(0)+" KB");
