import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function useUser() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function getUser() {
      const response = await axios.get("http://10.0.2.2:3000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = response.data;
      setUser(user);
      setIsLoading(false);
    }

    getUser();
  }, [token]);

  return [user, isLoading];
}
