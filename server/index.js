const express = require('express');
const app = express();
const { PORT } = require('./config');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const authMiddleware = require('./middlewares/authMiddleware');

start();

async function start() {
    app.use(express.json());
    app.use(authMiddleware());

    await databaseConfig(app);
    routesConfig(app);
}

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}/`));