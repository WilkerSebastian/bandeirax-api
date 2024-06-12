import type { Request, Response } from "express";
import User from "../model/User";
import UserService from "../service/UserService";
import { log } from "../utils/log";

export default class UserController {

    public static async create(req: Request, res: Response) {

        try {
         
            const user = new User(req.body);

            await UserService.create(user)

            return res.status(201).json({
                message: "User created successfully",
                email: user.getEmail(),
                validate: `${req.get("origin")}/user/validate/${user.getId()}`
            })

        } catch (e) {

            const error = e instanceof Error ? e.message : "error";

            await log(error)

            return res.status(500).json({
                message: "Internal server error to create user"
            })
            
        }

    }

}