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

    public static async update(user: User, passUpdate:boolean = false) {

        if (passUpdate) {

            const salt = await bcrypt.genSalt(10)

            const password = await bcrypt.hash(user.getPassword(), salt)

            await query(`
                UPDATE public."user"
                SET name=$1, email=$2, password=$3
                WHERE id=$4;`, 
                [user.getName(), user.getEmail(), password, user.getId()]);

            return;

        }
        
        await query(`
            UPDATE public."user"
            SET name=$1, email=$2
            WHERE id=$3;`, 
            [user.getName(), user.getEmail(), user.getId()]);

    }

    public static async delete(user: User) {

        await query(`
            DELETE FROM public."user"
            WHERE id=$1;`, 
            [user.getId()]);

    }

    public static async updateActivite(id: string, active: boolean) {

        await query(`
            UPDATE public."user"
            SET active=$1
            WHERE id=$2;`, 
            [active, id]);

    }

    public static async getElementById(id: string): Promise<User> {

        return (await query(`SELECT id, name, email FROM public."user" WHERE id=$1`, [id])).rows[0];

    }

    public static async getAllElements(): Promise<User[]> {

        return (await query(`SELECT id, name, email, active, "isAdmin" FROM public."user" ORDER BY id`)).rows;

    }

}