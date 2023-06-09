const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.DB_PORT, () => {
    console.log('%s listening at' ,process.env.DB_PORT); // eslint-disable-line no-console
  });
});
