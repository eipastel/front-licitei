import { api } from "../config/api";
import { endpoints } from "../config/endpoints";

export interface ApiResponse {
    data: string
}

export const authService = {
    login: async (email: string, password: string): Promise<ApiResponse> => {
        return api.post(endpoints.LOGIN, { 
            email,
            senha: password
        })
    },
};
