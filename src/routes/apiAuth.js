import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/models';

const router = Router();

// registration
router.post('/registration', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('BODY', req.body);

  if (username === '' || email === '' || password === '') {
    console.log('here');
    return res.sendStatus(401);
  }

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
  res.clearCookie('user_sid').sendStatus(200);
});

export default router;
