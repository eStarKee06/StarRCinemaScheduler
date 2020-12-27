const express = require('express');
const scheduleRoutes = require('./routes/schedule-routes');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
//send any request with /api to routes index

app.use('/api/schedule', scheduleRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))