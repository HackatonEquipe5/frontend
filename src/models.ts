// src/models.ts

export interface Device {
    _id: number;
    name: string;
    dateAdded: string;
    image: string;
    location: string;
    isFavorite: boolean;
}

export interface CreateDeviceModel {
    name: string;
    image: File;
    location: string;
    isFavorite: boolean;
}

export interface UpdateDeviceModel {
    name: string;
    image?: File;
    location: string;
    isFavorite: boolean;
}

export interface User {
    _id: number;
    firstName: string;
    lastName: string;
    // dateAdded: string;
    password: string;
    email: string;
}

export interface CreateUserModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdateUserModel {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}