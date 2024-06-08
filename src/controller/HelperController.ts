import type { Request, Response } from "express";

export default class HelperController {

    public static async index(req: Request, res: Response) {

        return res.json({

            message: "Banderiax API",
            description: `Banderiax API is an API for managing users and points fo Banderiax APP.`,
            endPoints: [
                { method: "GET", path: "/", description: "description of the API and its endpoints" },
            ]

        });

    }

}