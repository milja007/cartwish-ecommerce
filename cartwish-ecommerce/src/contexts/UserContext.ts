import { createContext } from "react";

interface JwtPayload {
  exp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const UserContext = createContext<JwtPayload | null>(null);

export default UserContext;
