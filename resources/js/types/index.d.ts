export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    username: string;
    credit?: number;
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

export interface OtpSource {
    id: number;
    name: string;
    description?: string;
    assign_to?: User | null;
    created_by?: number;
    otp: string;
}

export interface Reseller {
    id: number;
    name: string;
    description: string;
    whatsapp: string;
    facebook: string;
    telegram: string;
    image: string;
    user_id: number;
    user: User;
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
    otp: OtpSource[];
    reseller: Reseller[];
};
