import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const initState = {};
  res.render('Layout', initState);
});

router.get('/registration', (req, res) => {
  const initState = {};
  res.render('Layout', initState);
});

router.get('/authorization', (req, res) => {
  const initState = {};
  res.render('Layout', initState);
});

router.get('/something', (req, res) => {
  const initState = {};
  res.render('Layout', initState);
});

export default router;
