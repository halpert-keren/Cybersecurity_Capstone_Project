const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const messageRouter = require("./routers/message.router");
const Message = require('./models/message');
const User = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: true, credentials: true}));
app.use(logger("dev"));

app.use('/dbdump', async function(req, res){
    let results = []
    await User.find({})
        .then(docs => results = results.concat(docs))
        .catch(err => console.log(err))
    await Message.find({})
        .then(docs => results = results.concat(docs))
        .catch(err => console.log(err))
    res.json(results)
});

app.use('/auth', authRouter.router);
app.use('/api/users', userRouter.router);
app.use('/api/messages', messageRouter.router);

app.use((req, res) => {
    res.status(500).send('Something is broken!');
});

app.listen(PORT, () => console.log('Express server is running on port ', PORT));