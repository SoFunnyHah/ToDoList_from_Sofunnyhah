import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User, Task } from '../db/models';

const router = Router();

// edit post
router.patch('/edit/:id', async (req, res) => {
  console.log('--------req.params.id UPDATE', req.params.id);
  await Task.update(req.body, { where: { id: req.params.id } });
  const tasksList = await Task.findAll();
  const tasks = tasksList.sort((a, b) => a.id - b.id);
  res.json(tasks);
});

// delete post /task/comment
router.delete('/delete/:id', async (req, res) => {
  console.log('-------req.params.id DELETE', req.params.id);
  await Task.destroy({ where: { id: req.params.id } });
  const result = await Task.findAll();
  res.json(result);
});

// создание комментария карточки или поста - суть одна )))
router.post('/createTask', async (req, res) => {
  const { title, description } = req.body;
  console.log('title:', title);
  console.log('description:', description);
  console.log('userid:', res.locals.user.id);
  const result = await Task.create({ title, description, userid: res.locals.user.id });
  res.json(result);
});
router.get('/createTask', async (req, res) => {
  const tasksList = await Task.findAll();
  const tasks = tasksList.sort((a, b) => a.id - b.id);
  res.json(tasks);
});

// registration
router.post('/registration', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) { return res.json({ status: 400, message: 'username, email or password not valid' }); }
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ username, email, password: hashPassword });
    req.session.user = { id: newUser.id, email: newUser.email, username: newUser.username };
    res.json({ id: newUser.id, email: newUser.email, username: newUser.username });
  } catch (err) {
    console.error(err);
  }
});

// // authorisation
router.route('/authorization')
  .get((req, res) => {
    res.render('Layout', {});
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        const currUser = { id: user.id, username: user.username };
        req.session.user = currUser;
        return res.json(currUser);
      }
      return res.sendStatus(401);
    }
    return res.sendStatus(401);
  });

// logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

export default router;
