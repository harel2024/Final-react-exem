export interface IUser {
    username: string;
    password: string;
    organization: string;
    location?: string;
    resources?: {
        missile?: IMission;
        amount: number;
    }[];
    budget?: number;
}
export interface IMission {
    _id?: string;
    name: string;
    description: string;
    speed: Number;
    intercepts: string[];
    price: Number;
}