import { useState, useEffect } from "react";
import { client } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

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
    return client.auth.admin.deleteUser(session.user.id);
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
