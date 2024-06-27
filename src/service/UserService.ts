import { query } from "../database/connection";
import User from "../model/User";
import bcrypt from "bcryptjs"

export default class UserService {

    public static async create(user: User) {

        const salt = await bcrypt.genSalt(10)

        const password = await bcrypt.hash(user.getPassword(), salt)

        await query(`
            INSERT INTO public."user"
            (id, name, email, password, active, "isAdmin", points)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`, 
            [user.getId(), user.getName(), user.getEmail(), password, user.getActive(), user.getIsAdmin(), user.getPoints()]);

    }

    public static async update(user: User) {
        
        await query(`
            UPDATE public."user"
            SET name=$1, email=$2
            WHERE id=$3;`, 
            [user.getName(), user.getEmail(), user.getId()]);

    }

    public static async delete(id: string) {

        await query(`
            DELETE FROM public."user"
            WHERE id=$1;`, 
            [id]);

    }

    public static async updateActivite(id: string, active: boolean) {

        await query(`
            UPDATE public."user"
            SET active=$1
            WHERE id=$2;`, 
            [active, id]);

    }

    public static async updatePoints(id: string, points: number) {

        await query(`
            UPDATE public."user"
            SET points=$1
            WHERE id=$2;`, 
            [points, id]);

    }

    public static async getElementByEmail(email: string): Promise<User> {

        const data = (await query(`SELECT id, name, email, password, active, "isAdmin", points FROM public."user" WHERE email=$1`, [email])).rows[0]

        return new User({
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            active: data.active,
            isAdmin: data.isAdmin,
            points: data.points
        })

    }

    public static async getElementById(id: string): Promise<User> {

        return (await query(`SELECT id, name, email, active, "isAdmin", points FROM public."user" WHERE id=$1`, [id])).rows[0];

    }

    public static async getAllElements(): Promise<User[]> {

        return (await query(`SELECT id, name, email, active, "isAdmin", points FROM public."user" ORDER BY id`)).rows;

    }

    public static async countElements(): Promise<number> {

        return parseInt((await query(`SELECT COUNT(*) FROM public."user"`)).rows[0].count);

    }

}