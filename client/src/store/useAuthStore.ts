import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import type { UserType } from "../types/user";

interface AuthState {
  authUser: UserType | null;
  isSignUp: boolean;
  isLogin: boolean;
  isLogout: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  checkAuth: () => void;
  signUp: (formData: {
    username: string;
    email: string;
    password: string;
  }) => void;
  login: (formData: { email: string; password: string }) => void;
  logout: () => void;
  updateProfile: (formData: {
    profilePicture: string | ArrayBuffer | null;
  }) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSignUp: false,
  isLogin: false,
  isLogout: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error checking authentication:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (formData) => {
    set({ isSignUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      set({ authUser: response.data });
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.log("Error signing up:", error);
      set({ authUser: null });
    } finally {
      set({ isSignUp: false });
    }
  },
  login: async (formData) => {
    set({ isLogin: true });
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      set({ authUser: response.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.");
      console.log("Error logging in:", error);
      set({ authUser: null });
    } finally {
      set({ isLogin: false });
    }
  },
  logout: async () => {
    set({ isLogout: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.log("Error logging out:", error);
    } finally {
      set({ isLogout: false });
    }
  },
  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put(
        "/auth/update-profile",
        formData
      );
      set({ authUser: response.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.log("Error updating profile:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

export default useAuthStore;
