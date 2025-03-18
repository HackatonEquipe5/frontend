import {CreateDeviceModel, Device, UpdateDeviceModel} from "@/models";

export async function fetchDevices(): Promise<Device[]> {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
        throw new Error("Token JWT manquant. Veuillez vous reconnecter.");
    }

    try {
        const response = await fetch("http://localhost:3000/api/connectobject", {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            throw new Error("Failed to fetch devices");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}

export async function fetchDeviceById(id: string): Promise<Device> {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
        throw new Error("Token JWT manquant. Veuillez vous reconnecter.");
    }

    console.log("ID:", id);
    try {
        const response = await fetch(`http://localhost:3000/api/connectobject/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch device");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching device by ID:", error);
        throw error;
    }
}

export async function createDevice(device: CreateDeviceModel): Promise<Device> {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
        throw new Error("Token JWT manquant. Veuillez vous reconnecter.");
    }

    try {
        const base64Image = await convertToBase64(device.image);

        const deviceData = {
            name: device.name,
            location: device.location,
            isFavorite: device.isFavorite,
            image: base64Image, // Image en base64
            id_device: device.id_device,
        };

        const response = await fetch("http://localhost:3000/api/createconnectobject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            throw new Error("Failed to create device");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating device:", error);
        throw error;
    }
}

export async function updateDevice(id: string, device: UpdateDeviceModel): Promise<Device> {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
        throw new Error("Token JWT manquant. Veuillez vous reconnecter.");
    }

    try {
        let base64Image = null;
        if (device.image) {
            base64Image = await convertToBase64(device.image);
        }

        const deviceData = {
            name: device.name,
            location: device.location,
            isFavorite: device.isFavorite,
            image: base64Image,
            id_device: device.id_device,
        };

        const response = await fetch(`http://localhost:3000/api/connectobject/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            throw new Error("Failed to update device");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating device:", error);
        throw error;
    }
}

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
