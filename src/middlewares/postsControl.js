/* eslint-disable consistent-return */
import { Task } from '../db/models';

export default async function postsControl(req, res, next) {
  const post = await Task.findOne({ where: { id: req.params.id } });
  // Вопрос нужен чтобы убедиться, что это свойство не undefined
  if (req.session?.user.id === post?.userid) {
    console.log('!!!POSTCONTROLLED!!!');
    return next();
  }
  res.status(401).json({ message: 'Не верный пользователь!' });
}
