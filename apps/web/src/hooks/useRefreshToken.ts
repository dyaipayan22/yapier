import axiosPublic from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export const useRefreshToken = () => {
  const setRefreshedToken = useAuthStore((state) => state.setRefreshedToken);

  const refresh = async () => {
    const response = await axiosPublic.get("/api/v1/auth/refresh", {
      withCredentials: true,
    });
    setRefreshedToken(response.data.payload);
    return response.data.payload;
  };

  return refresh;
};
