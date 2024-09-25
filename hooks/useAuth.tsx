import { useState, useEffect } from "react";
import { client } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

/**
 * Custom hook `useAuth` to manage user authentication using Supabase.
 *
 * This hook provides session management, sign-in, sign-up, sign-out, and delete account functionality.
 * It also listens for changes in the authentication state (e.g., user signing in or out) and updates the session accordingly.
 *
 * @returns {Object} - The authentication object with the following properties and methods:
 * @property {Session | null} session - The current session object, or null if no user is signed in.
 * @property {function} signIn - Function to sign in a user using email and password.
 * @property {function} signUp - Function to sign up a new user with email and password.
 * @property {function} signOut - Function to sign out the current user.
 * @property {boolean} loading - Indicates whether authentication is in a loading state (e.g., during sign in/out).
 * @property {function} deleteAccount - Function to delete the current user's account.
 *
 * @example
 * const { session, signIn, signOut, signUp, loading, deleteAccount } = useAuth();
 *
 * @example
 * // Example of using signIn function
 * signIn("user@example.com", "password123")
 *   .then(() => console.log("Signed in successfully"))
 *   .catch((error) => console.error("Error signing in:", error));
 *
 * @example
 * // Example of using signOut function
 * signOut()
 *   .then(() => console.log("Signed out successfully"))
 *   .catch((error) => console.error("Error signing out:", error));
 */

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await client.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = client.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    return client.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string) =>
    client.auth.signUp({ email, password });

  const signOut = async () => {
    setLoading(true);
    await client.auth.signOut();
    setSession(null);
    setLoading(false);
  };

  const deleteAccount = async () => {
    if (!session?.user.id) throw new Error("No session");
    const { data } = await client.auth.admin.deleteUser(session.user.id);
    signOut();
    return data;
  };

  return {
    session,
    signIn,
    signUp,
    signOut,
    loading,
    deleteAccount,
  };
};
