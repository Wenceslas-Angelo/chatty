import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import type { UserType } from "../types/user";
import useAuthStore from "./useAuthStore";

interface ChatState {
  messages: {
    _id: string;
    text: string;
    senderId: string;
    createdAt: string;
    image?: string;
  }[];
  users: UserType[];
  selectedUser: UserType | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: UserType | null) => void;
  sendMessage: ({
    text,
    image,
  }: {
    text: string;
    image?: string;
  }) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data });
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error("Failed to fetch messages");
      console.error("Error fetching messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (user: UserType | null) => set({ selectedUser: user }),

  sendMessage: async ({ text, image }: { text: string; image?: string }) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/${selectedUser?._id}`,
        {
          text,
          image,
        }
      );
      set({
        messages: [...messages, response.data],
      });
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Error sending message:", error);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (message) => {
      const isMessageSentToSelectedUser = message.senderId === selectedUser._id;
      if (!isMessageSentToSelectedUser) return;
      if (message.senderId !== selectedUser._id) return;
      set({
        messages: [...get().messages, message],
      });
    });

    // return () => {
    //   socket.off("newMessage");
    // };
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
