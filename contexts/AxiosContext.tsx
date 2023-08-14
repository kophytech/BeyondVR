import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const createAxiosInstance = () => {
  return axios.create({
    baseURL: "https://beyond-vr.herokuapp.com",
  });
};

type AxiosContextType = ReturnType<typeof useAxiosContextFactory>;
interface RequestParams {
  url: string;
  data?: any;
}

interface useMutationParams {
  url: string;
  method?: "POST" | "PUT" | "DELETE";
  data?: any;
  options?: UseMutationOptions;
}

const useAxiosContextFactory = () => {
  const [loading, setLoading] = useState(true);
  const publicAxios = createAxiosInstance();
  const privateAxios = createAxiosInstance();

  const { token, logout } = useAuth();

  privateAxios.interceptors.request.use(
    async (config) => {
      if (!config.headers.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      toast.error(error.response.data.message);
      return Promise.reject(error);
    }
  );

  privateAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        logout();
        toast.error(error.response.data.message);
        return Promise.reject(error);

      }

      const developmentMode = process.env.NODE_ENV === "development";
      if (developmentMode) console.log("Response error: ", error.response);

      if (error.response.data?.message) {
        toast.error(error.response.data.message);
      }

      return Promise.reject(error);
    }
  );

  const getRequest = async ({ url }: RequestParams) => {
    const response = await privateAxios.get(url);

    return response?.data?.data || response;
  };

  const postRequest = async ({ url, data }: RequestParams) => {
    const response = await privateAxios.post(url, data);

    return response?.data?.data || response;
  };

  const putRequest: any = async ({ url, data }: RequestParams) => {
    const response = await privateAxios.put(url, data);

    return response?.data?.data || response;
  };

  const deleteRequest = async ({ url }: RequestParams) => {
    const response = await privateAxios.delete(url);

    return response?.data?.data || response;
  };

  const useQueryWrapper = (
    key: string[],
    url: string,
    options?: UseQueryOptions
  ) => {
    const apiCall = () => getRequest({ url });

    return useQuery({ queryKey: key, queryFn: apiCall, ...options });
  };

  const useMutationWrapper = ({
    url,
    method,
    data,
    options,
  }: useMutationParams) => {
    const apiCall = () => {
      switch (method) {
        case "POST":
          return postRequest({ url, data });
        case "PUT":
          return putRequest({ url, data });
        case "DELETE":
          return deleteRequest({ url });
        default:
          return postRequest({ url, data });
      }
    };

    return useMutation({ mutationFn: apiCall, ...options });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    publicAxios,
    privateAxios,
    loading,
    useMutationWrapper,
    useQueryWrapper,
  };
};

const initialState: AxiosContextType = {
  publicAxios: createAxiosInstance(),
  privateAxios: createAxiosInstance(),
  loading: true,
  useQueryWrapper: undefined!,
  useMutationWrapper: undefined!,
};

const AxiosContext = createContext(initialState);

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const value = useAxiosContextFactory();
  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
};

const useAxios = () => useContext(AxiosContext);

export { AxiosProvider, useAxios };
