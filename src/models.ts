// src/models.ts

export interface Device {
    _id: number;
    name: string;
    image: string;
    location: string;
    isFavorite: boolean;
    id_device: string;
}

export interface CreateDeviceModel {
    name: string;
    image: File;
    location: string;
    isFavorite: boolean;
    id_device: string;
}

export interface UpdateDeviceModel {
    name: string;
    image?: File;
    location: string;
    isFavorite: boolean;
    id_device: string;
}

export interface User {
    _id: number;
    firstName: string;
    lastName: string;
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