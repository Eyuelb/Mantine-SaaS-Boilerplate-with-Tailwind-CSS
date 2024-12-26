import { TUser } from "@/models/user";

export type Session = {
  user: TUser | undefined;
  token: JWT | undefined;
  account: Account | undefined;
};

export type Account = TUser;

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  stripeCustomerId?: string | null;
};

export interface JWT {
  accessToken: string;
}

export type AuthContextType = {
  session: Session;
  isSignedIn: boolean;
  setSession: (data: Session) => void;
  signOut: () => Promise<void>;
};
