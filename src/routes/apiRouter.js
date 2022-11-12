import { Router } from 'express';
import { Task } from '../db/models';
import postsControl from '../middlewares/postsControl';

const router = Router();

// edit post
router.patch('/edit/:id', postsControl, async (req, res) => {
  // console.log('--------req.params.id UPDATE', req.params.id);
  await Task.update(req.body, { where: { id: req.params.id } });
  const tasksList = await Task.findAll({ order: [['id', 'ASC']] });
  res.json(tasksList);
});

// delete post /task/comment
router.delete('/delete/:id', postsControl, async (req, res) => {
  console.log('-------req.params.id DELETE', req.params.id);
  await Task.destroy({ where: { id: req.params.id } });
  const tasksList = await Task.findAll({ order: [['id', 'ASC']] });
  res.json(tasksList);
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
  const tasksList = await Task.findAll({ order: [['id', 'ASC']] });
  res.json(tasksList);
});

export default router;
