/* RN Ready — storage dispatcher.
   default        → store-json.js  (zero-dep JSON file, atomic + debounced)
   STORE=pg       → store-pg.js    (Postgres document-mode adapter, needs pg)
   Both implement: load() · save() · saveNow() · FILE (label)                  */
module.exports = process.env.STORE === "pg" ? require("./store-pg") : require("./store-json");
