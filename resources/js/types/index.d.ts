export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    username: string;
    roles: Roles[];
}

export interface Permission {
    id: number;
    name: string;
}

export interface Roles {
    id: number;
    name: string;
    permissions: Permission[];
}

export interface Flash {
    success?: string;
    error?: string;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    username: string;
    roles: Roles[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        roles: Roles[];
    };
    roles: Roles[];
    users: User[];
    permissions: Permission[];
    flash: Flash;
    authUser: AuthUser;
};
