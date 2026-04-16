import { createContext, useContext, useEffect, useState } from "react";
import {
  ApiError,
  getAccessToken,
  setAuthFailureHandler,
  setUserProfile,
} from "../services/apiClient";
import { getCurrentUser, loadCachedUser, logoutUser } from "../services/authService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const hydrateUser = async () => {
      let cachedUser = null;

      try {
        setAuthError(null);

        const [storedUser, token] = await Promise.all([
          loadCachedUser(),
          getAccessToken(),
        ]);

        cachedUser = storedUser;

        if (!isMounted) return;

        if (storedUser) {
          setUser(storedUser);
        }

        if (!token) {
          setUser(null);
          return;
        }

        const freshUser = await getCurrentUser();
        if (!isMounted) return;

        setUser(freshUser);
      } catch (error) {
        console.error("Error hydrating user:", error);

        if (!isMounted) return;

        if (error instanceof ApiError && [401, 403].includes(error.status)) {
          await logoutUser();
          setUser(null);
          setAuthError("Your session has expired. Please log in again.");
        } else if (cachedUser) {
          setUser(cachedUser);
          setAuthError("Unable to refresh session. Showing cached profile.");
        } else {
          setUser(null);
          setAuthError(error?.message || "Unable to load your session.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const handleAuthFailure = async (message) => {
      if (!isMounted) return;

      await logoutUser();
      setUser(null);
      setAuthError(message || "Your session has expired. Please log in again.");
    };

    setAuthFailureHandler(handleAuthFailure);
    hydrateUser();

    return () => {
      isMounted = false;
      setAuthFailureHandler(null);
    };
  }, []);

  const updateUser = async (userData) => {
    try {
      await setUserProfile(userData);
      setUser(userData);
      setAuthError(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setAuthError("Unable to update user profile in local storage.");
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setAuthError(null);
    }
  };

  const clearAuthError = () => setAuthError(null);

  return (
    <UserContext.Provider
      value={{ user, loading, authError, clearAuthError, setUser: updateUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
