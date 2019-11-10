import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import connectStore from "connect-mongo";
import { PORT, NODE_ENV, MONGO_URI,SESS_NAME, SESS_SECRET,
        SESS_LIFETIME } from './config';

(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true});
    console.log('mongodb connected!');

    const app = express ();
    const MongoStore = connectStore(session);

    const userRoutes = require('./routes/index');
    const sessionRoutes = require('./routes/session');

    app.disable('x-powered-by');

    app.use(express.urlencoded({ extended: true}));
    app.use(express.json());
    app.use (session({
      name: SESS_NAME,
      secret: SESS_SECRET,
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({ 
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(SESS_LIFETIME) / 1000
      }),
      cookie: {
        sameSite: true,
        secure: NODE_ENV === 'production',
        maxAge: parseInt(SESS_LIFETIME)
      }
    }));

    const apiRouter = express.Router();

    // set up router so app uses this for paths with /api
    app.use('/api', apiRouter);

    // apiRouter uses userRoutes for /users
    apiRouter.use('/users', userRoutes);

    // apiRouter uses sessionRoutes for /users
    apiRouter.use('/session', sessionRoutes);

    app.listen( PORT, () => console.log(`Listening on port ${PORT}`));
  }
  catch (err) {
    console.log(err)
  }
}) ();
