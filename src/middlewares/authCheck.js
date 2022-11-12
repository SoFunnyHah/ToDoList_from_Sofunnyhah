export default function authCheck(req, res, next) {
  // Вопрос нужен чтобы убедиться, что это свойство не undefined
  if (req.session?.user) {
    next();
  }
  res.status(401).json({ message: 'Пользователь не авторизирован' });
}
