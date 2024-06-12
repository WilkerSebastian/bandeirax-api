import { query } from "../database/connection";
import User from "../model/User";
import bcrypt from "bcryptjs"

export default class UserService {

    public static async create(user: User) {

        const salt = await bcrypt.genSalt(10)

        const password = await bcrypt.hash(user.getPassword(), salt)

        await query(`
            INSERT INTO public."user"
            (id, name, email, password, active, "isAdmin")
            VALUES ($1, $2, $3, $4, $5, $6);`, 
            [user.getId(), user.getName(), user.getEmail(), password, user.getActive(), user.getIsAdmin()]);

    }

    public static async getAllElements(): Promise<User[]> {

        return (await query(`SELECT id, nome, email, active, "isAdmin" FROM public."user" ORDER BY id`)).rows;

    }

}