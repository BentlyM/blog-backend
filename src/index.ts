import express from 'express';
import session from 'express-session';
import passport from 'passport';
import {default as registerRouter} from './routes/register';
import {default as loginRouter} from './routes/login';
import {default as protectedRouter} from './routes/protected';
import loggerMiddleware from './middleware/logger';


const app = express();

const hostname = '0.0.0.0';
const PORT = +(process.env.PORT || 8080);

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(loggerMiddleware);

app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', protectedRouter);

app.listen(PORT, hostname, ()=>{
    console.log(`listening on server http://${hostname}:${PORT}`);
})