/* Vercel serverless entry for the RN Ready exam server.
   ../server.js boots the engine + store once per lambda instance (module
   require); each invocation awaits `ready` and then reuses the same request
   handler the standalone server uses, so behavior is identical everywhere.  */
const app = require("../server.js");

module.exports = async (req, res) => {
  try { await app.ready; }
  catch(e){ res.statusCode = 500; return res.end("server boot failed: " + e.message); }
  return app.handler(req, res);
};
