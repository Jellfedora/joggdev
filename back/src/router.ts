import express from 'express';

import MainController from './controllers/mainController';
// const auth = require('./middlewares/auth');
const router: express.Router = express.Router();

// Goals
router.get(`/api/get-goals`, MainController.getGoals);
router.post(`/api/add-goal`, MainController.addGoal);
router.post(`/api/edit-goal/:key`, MainController.editToOldGoal);
router.delete(`/api/delete-goal/:key`, MainController.deleteGoal);

export default router;