import type { Request, Response } from "express";
import User from "../model/User";
import UserService from "../service/UserService";
import { log } from "../utils/log";
import { compare } from "bcryptjs"
import EmailService from "../service/EmailService";

export default class UserController {

    private static CACHE_PAGE:string | null = null

    public static async create(req: Request, res: Response) {

        if (!(UserController.checkApiKey(req.params.key)))
            return res.status(401).json({
               message: "Unauthorized" 
            });

        try {
         
            const user = new User(req.body);

            await UserService.create(user)

            const url = `${req.protocol + "://" + req.get("host")}/user/validate/${Buffer.from(user.getId()).toString("base64")}`

            if (process.env.NODE_ENV == "production")
                EmailService.sendEmail(url, {
                    name: user.getName(),
                    email: user.getEmail()
                });

            return res.status(201).json({
                message: "User created successfully",
                id: user.getId(),
                email: user.getEmail(),
                validate: url
            })

        } catch (e) {

            const error = e instanceof Error ? e.message : "error";

            await log(error)

            return res.status(500).json({
                message: `Internal server error to create user`
            })
            
        }

    }

    public static async validate(req: Request, res: Response) {

        const { idToken } = req.params;

        try {

            const id = Buffer.from(idToken, "base64").toString("utf8");
            
            const user = await UserService.getElementById(id)
         
            if (user) {

                await UserService.updateActivite(id, true)

                if (process.env.NODE_ENV == "development")
                    return res.status(200).json({
                        message: "User validated successfully"
                    });

                return res.redirect(`${req.protocol + "://" + req.get("host")}/validate/UGFyYWLDqW5zIGNhZGFzdHJvIGZpbmFsaXphZG8gY29tIHN1Y2Vzc28sIHJldG9ybmUgYW8gYXBsaWNhdGl2by4`)
            }

            throw new Error("user not found")

        } catch (error) {
 
            await log(error)

            if (process.env.NODE_ENV == "development")
                return res.status(500).json({
                    message: "Failed to validate user"
                });
            
            return res.redirect(`${req.protocol + "://" + req.get("host")}/validate/RmFsaGEgYW8gY2FkYXN0cmFyLCBhY2Vzc2UgdW1hIFVSTCB2w6FsaWRhLg==`)

        }

    }   

    public static async validateView(req: Request, res: Response) {

        await log(UserController.CACHE_PAGE)

        if (!UserController.CACHE_PAGE) 
            UserController.CACHE_PAGE = await Bun.file("src/views/validate.html").text();

        res.send(UserController.CACHE_PAGE);

    }

    public static async verifiedLogin(req: Request, res: Response) {

        if (!(UserController.checkApiKey(req.params.key)))
            return res.status(401).json({
               message: "Unauthorized" 
            });

        try {
         
            const user = await UserService.getElementByEmail(req.body.email)

            if (!user) return res.status(404).json({
                message: "User not found"
            });
            
            if(await compare(req.body.password, user.getPassword())) {

                return res.status(200).json({
                    message: "User validated successfully",
                    data:user
                })

            }

            return res.status(401).json({
                message: "Wrong password"
            })

        } catch (error) {

            await log(error)

            return res.status(500).json({
                message: `Internal server error to search user by email`
            })          
            
        }

    }

    public static async update(req: Request, res: Response) {

        if (!(UserController.checkApiKey(req.params.key)))
            return res.status(401).json({
               message: "Unauthorized" 
            });

        const user = new User(req.body);

        try {

            await UserService.update(user)

            return res.status(200).json({
                message: "User updated successfully"
            })
            
        } catch (error) {
  
            await log(error)

            return res.status(500).json({
                message: `Internal server error to update user`
            })

        }

    }

    public static async delete(req: Request, res: Response) {

        if (!(UserController.checkApiKey(req.params.key)))
            return res.status(401).json({
               message: "Unauthorized" 
            });

        const id = Buffer.from(req.params.id, "base64").toString("utf-8");

        try {
            
            await UserService.delete(id);

            return res.status(200).json({
                message: "User deleted successfully"
            })

        } catch (error) {

            await log(error)

            return res.status(500).json({
                message: `Internal server error to delete user`
            })

        }

    }

    public static async count(req: Request, res: Response) {

        if (!(UserController.checkApiKey(req.params.key)))
            return res.status(401).json({
               message: "Unauthorized" 
            });

        try {

            const count = await UserService.countElements()
            

            return res.status(200).json({
                message: "User count successfully",
                count: count
            })

        } catch (error) {

            await log(error)

            return res.status(500).json({
                message: `Internal server error to count users`
            })

        }

    }

    private static checkApiKey(key:string | undefined): boolean {

        return key === process.env.API_KEY;

    }

} 