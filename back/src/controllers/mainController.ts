import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { Goal, IGoal } from '../models/goals';

export default class MainController {

    // Liste tout les objectifs courants
    static async getGoals(request: Request, response: Response) {
        const allGoals: Array<IGoal> = await Goal.find();

        return response.status(200).json(allGoals);
    }

    // Liste tout les objectifs anciens
    static async getOldGoals(request: Request, response: Response) {
        const allGoals: Array<IGoal> = await Goal.find({ is_old: true });

        return response.status(200).json(allGoals);
    }

    // Ajoute un objectif
    static async addGoal(request: Request, response: Response) {
        const newGoal: IGoal = new Goal({
            title: 'Poids',
            value: '90Kg',
            is_old: false,
            created_at: new Date(),
            updated_at: new Date()
        });
        newGoal.save((err, goal) => {
            if (err) {
                throw err;
            } else {
                return response.status(200).json(newGoal);
            }
        });
    }

    // Supprime un objectif
    static async deleteGoal(request: Request, response: Response) {
        const allGoals: Array<IGoal> = await Goal.find({ is_old: false });

        return response.status(200).json(allGoals);
    }
}