import express from 'express';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import store from 'session-file-store';
import indexRouter from './routes/indexRouter';
import apiRouter from './routes/apiRouter';
import jsxRender from './utils/jsxRendex';

require('dotenv').config();

const PORT = process.env.PORT || 3005;

const app = express();

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));

const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'oh klahoma', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('The price in dollars for this web:', PORT);
});
