import { query } from "../database/connection";
import type User from "../model/User";

export default class UserService {

    public static async create(user: User) {
        
        query(`INSERT INTO user VALUES ($1, $2, $3, $4, $5, $6)`, [user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getActive(), user.getIsAdmin()]);

    }

    public static async getAllElements(): Promise<User[]> {

        return (await query(`SELECT * FROM user ORDER BY id`)).rows;

    }

}