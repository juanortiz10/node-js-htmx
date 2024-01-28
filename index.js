const express = require('express');
const UserRouter = require('./routes/User');
const initMongoConfig = require('./config/mongo');

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

initMongoConfig().catch(console.dir);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', UserRouter);

app.listen(PORT, () => {
    console.log('Server listening on port: ', PORT);
});

module.exports = app;