const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Register {
    nombre: string,
    email: string,
    contrasenia: string
    confirmarContrasenia: string
}

export interface Login {
    email: string,
    contrasenia: string
}

export const authService = {
    async register(data: Register){
        try {
            const response = await fetch(`${API_URL}/vendedores/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const text = await response.text();
            if (!response.ok) {
                throw new Error(text || 'Error en el registro');
            }

            return { success: true, message: text };
        } catch (error){
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Error desconocido en el registro');
        }
    },

    async login(login: Login) {
        try {
            const response = await fetch(`${API_URL}/vendedores/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login)
            });

            const data = await response.json();
            console.log("Respuesta completa del backend:", data);


            if (!response.ok) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            if (data.id) {
                localStorage.setItem('userId', data.id.toString());
            }
            if (data.nombre) {
                localStorage.setItem('userName', data.nombre);
            }
            if (data.email) {
                localStorage.setItem('userEmail', data.email);
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Error desconocido en el inicio de sesión');
        }
    },


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    getUserData() {
        return {
            id: localStorage.getItem('userId'),
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),
        };
    }
}