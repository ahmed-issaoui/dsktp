const express = require('express');
const path = require('path');

module.exports = expressServer = () => {


const app = express();

const buildPath = path.normalize(path.join(__dirname));
app.use(express.static(buildPath));


// Routes
const router = express.Router();

router.get('/', (req,res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});
  
app.use('/', router);

app.listen(4198);

}