import { AUTH_ENDPOINT } from "@/const/api";
import { User, Credentials, NewUserData } from "@/types/authType";
import { apiRequest } from "@/utils/apiRequest";
import { buildUrl } from "@/utils/buildUrl";

export const authService = {
  async loginUser(credentials: Credentials): Promise<User> {
    const url = buildUrl(AUTH_ENDPOINT, { resource: "login" });
    const res = await apiRequest<User>(url, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return res;
  },
  async registerUser(userData: NewUserData): Promise<User> {
    const url = buildUrl(AUTH_ENDPOINT, { resource: "register" });
    return await apiRequest<User>(url, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  async checkEmailExists(email: string): Promise<boolean> {
    const url = buildUrl(AUTH_ENDPOINT, { resource: "register/check-email" });
    const { data } = await apiRequest<{ data: { isEmailRegistered: boolean }, status: string }>(url, {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return data.isEmailRegistered;
  },

  async checkAuthStatus(): Promise<User> {
    const url = buildUrl(AUTH_ENDPOINT, { resource: "check-status" });
    const response = await apiRequest<User>(url, { method: "GET" });
    return response;
  },
  async logoutUser(): Promise<void> {
    const url = buildUrl(AUTH_ENDPOINT, { resource: "logout" });
    return apiRequest<void>(url, { method: "POST" });
  },
};
