export interface Iuser {
    username: string;
    password: string;
    isAdmin?: boolean;
    hasVoted?: boolean;
    votedFor?: string | null;
}


export interface Icandidate {
    name: string;
    image: string | null;
    votes?: number |null;
}