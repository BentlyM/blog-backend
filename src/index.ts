import express, { NextFunction, Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport';
import {default as registerRouter} from './routes/register';
import {default as loginRouter} from './routes/login';
import {default as postsRouter} from './routes/posts';
import {default as commentsRouter} from './routes/comments'
import loggerMiddleware from './middleware/logger';
import cors from 'cors';


const app = express();

const hostname = '0.0.0.0';
const PORT = +(process.env.PORT || 8080);

const corsOptions = {
    origin: '*',
}

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));

app.use(loggerMiddleware);

app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', postsRouter);
app.use('/', commentsRouter);

app.use('*', (req, res) => {
	res.status(404).json({
		error: 'Resource not found',
	});
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
      error: 'Internal server error',
    });
  
  });

app.listen(PORT, hostname, ()=>{
    console.log(`listening on server http://${hostname}:${PORT}`);
})