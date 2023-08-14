import DecodeJWT from 'jwt-decode';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';

type AuthContextType = ReturnType<typeof useAuthContextFactory>;
interface tokenType {
  id: string;
  is_admin: boolean;
  is_teacher: boolean;
  is_student: boolean;
  iat: number;
}

const useAuthContextFactory = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState<tokenType | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const setUserData = useCallback((data: string) => {
    const decodedToken = DecodeJWT<tokenType>(data);
    setUser(decodedToken);
  }, []);

  const login = useCallback((token: string) => {
    setCookie('token', token, { path: '/' });
    setToken(token);
    setUserData(token);
  }, []);

  const logout = useCallback(() => {
    removeCookie('token', { path: '/' });
    setUser(null);
    setToken('');
  }, []);

  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
      setUserData(cookies.token);
    }
    setLoading(false);
  }, [cookies.token]);

  return {
    user,
    token,
    login,
    logout,
    loading,
  };
};

const initialState: AuthContextType = {
  user: null,
  token: '',
  login: (token: string) => {},
  logout: () => {},
  loading: true,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value = useAuthContextFactory();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
