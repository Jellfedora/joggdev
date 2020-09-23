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
        console.log(request.body.title)

        const newGoal: IGoal = new Goal({
            title: request.body.title,
            value: request.body.value,
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

    // Passe un objectif en terminé
    static async editToOldGoal(request: Request, response: Response) {
        console.log(request.params.key)
        let filter = { _id: request.params.key };

        let update = {
            is_old: true
        }

        let goalUpdated = await Goal.findOneAndUpdate(filter, update);

        return response.status(200).json(goalUpdated);
    }

    // Supprime un objectif
    static async deleteGoal(request: Request, response: Response) {
        console.log(request.params.key)


        const getGoal = await Goal.findOne({ _id: request.params.key });
        if (getGoal) {
            getGoal.remove((err, user) => {
                if (err) {
                    throw err;
                } else {
                    console.log(getGoal.title + ' supprimé');
                    return response.status(200).json(getGoal.title + ' supprimé');
                }
            });


        } else {
            return response.status(403).json('Aucun objectif portant cet identifiant trouvé');
        }
    }
}