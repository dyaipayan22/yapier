import axiosPublic from "@/lib/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAccessToken } = useAuth();

  const refresh = async () => {
    const response = await axiosPublic.get("/api/v1/auth/refresh", {
      withCredentials: true,
    });
    setAccessToken(response.data.accessToken);
    return response.data.accessToken;
  };

  return refresh;
};
