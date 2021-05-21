export interface UserData {
    user: UserDetails;
    sessionToken: string;
}

export interface UserDetails {
    id: number; 
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: string;
}

export interface Prof {
    profile: ProfileDetails[];
}

export interface ProfileDetails {
    id: number;
    picture: string;
    title: string;
    details: string;
}

export interface SubscriptionDetails {
    id: number;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    zip: string;
}