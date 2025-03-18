import {CreateUserModel, UpdateUserModel, User} from "@/models";

export async function fetchUsers(): Promise<User[]> {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
        throw new Error("Token JWT manquant. Veuillez vous reconnecter.");
    }

    try {
        const response = await fetch("http://localhost:3000/api/users", {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        },);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export async function fetchUserById(id: string): Promise<User> {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
}

export async function createUser(user: CreateUserModel): Promise<User> {
    try {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export async function updateUser(user: UpdateUserModel): Promise<User> {
    const jwtToken = localStorage.getItem("jwt_token");
    const userId = localStorage.getItem("user_id");
    if (!jwtToken) {
        throw new Error("Token JWT manquant. Veuillez vous reconnecter.");
    }
    if (!userId) {
        throw new Error("ID utilisateur manquant. Veuillez vous reconnecter.");
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export async function deleteUser(id: string): Promise<void> {
    const jwtToken = localStorage.getItem("jwt_token");
    if (!jwtToken) {
        throw new Error("Token JWT manquant. Veuillez vous reconnecter.");
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export async function loginUser(email: string, password: string): Promise<string> {
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Failed to log in");
        }

        const data = await response.json();

        const token = data.token;
        const userId = data.user._id;
        localStorage.setItem("jwt_token", token);
        localStorage.setItem("user_id", userId);

        return token;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function fetchCurrentUser(): Promise<User> {
    const jwtToken = localStorage.getItem("jwt_token");
    const userId = localStorage.getItem("user_id");

    if (!jwtToken) {
        throw new Error("Token JWT manquant. Veuillez vous reconnecter.");
    }

    if (!userId) {
        throw new Error("ID utilisateur manquant. Veuillez vous reconnecter.");
    }

    try {
        return await fetchUserById(userId);
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
}