import express from 'express';

import MainController from './controllers/mainController';
// const auth = require('./middlewares/auth');
const router: express.Router = express.Router();

// Goals
router.get(`/api/get-goals`, MainController.getGoals);
router.get(`/api/add-goal`, MainController.addGoal);
router.get(`/api/delete-goal`, MainController.deleteGoal);

export default router;