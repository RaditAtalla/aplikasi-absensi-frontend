import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();

  useEffect(() => {
    async function getToken() {
      const token = await SecureStore.getItemAsync("jwt");
      if (token) return;
    }

    getToken();
  }, []);

  async function login(newToken) {
    await SecureStore.setItemAsync("jwt", newToken);
    setToken(newToken);
  }

  async function logout() {
    await SecureStore.deleteItemAsync("jwt");
    setToken(null);
    router.dismissAll();
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
