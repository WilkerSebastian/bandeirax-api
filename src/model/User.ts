import {v4 as uuidv4} from "uuid";

export default class User {
    
    private id: string;
    private name: string;
    private email: string;
    private password: string;
    private active: boolean;
    private isAdmin: boolean;
    private points: number;

    constructor(user: {id?: string, name: string, email: string, password: string, active?: boolean, isAdmin?: boolean, points?: number}) {
        this.id = user.id || uuidv4();
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.active = user.active || false;
        this.isAdmin = user.isAdmin || false
        this.points = user.points || 0;  
    }

    public setId(id: string): void {
        this.id = id;
    }  

    public setName(name: string): void {
        this.name = name;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public setIsAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }

    public setPoints(points: number): void {
        this.points = points;
    }

    public getId(): string {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }           

    public getEmail(): string {
        return this.email;
    }   

    public getPassword(): string {
        return this.password;
    }

    public getActive(): boolean {
        return this.active;
    }

    public getIsAdmin(): boolean {        
        return this.isAdmin;
    }

    public getPoints(): number {
        return this.points;
    }

}