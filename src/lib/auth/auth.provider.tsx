"use client";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { Session } from "./auth.model";
import { AuthContext } from "./auth.context";
import { clearCookieSession, setCookieSession } from "./auth.service";

export const AuthProvider = ({
  children,
  session: pSession,
}: {
  children: ReactNode;
  session: Session | undefined;
}) => {
  const [storedSession, setSession] = useState<Session | undefined>(pSession);
  const isSignedIn = useRef<boolean>(!!pSession?.user);

  const setSessionToken = useCallback(
    (data: Session) => {
      isSignedIn.current = true;
      setSession(data);
      setCookieSession(data);
    },
    [setSession],
  );

  const session = useMemo(
    () =>
      ({
        token: storedSession?.token,
        user: storedSession?.user,
        account: storedSession?.account,
      }) as Session,
    [storedSession],
  );

  const signOut = useCallback(async () => {
    isSignedIn.current = false;
    setSession(undefined);
    await clearCookieSession();
  }, [setSession]);

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession: setSessionToken,
        signOut,
        isSignedIn: isSignedIn.current,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
