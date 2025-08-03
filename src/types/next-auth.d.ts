import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      randomId?: number;
      email?: string;
      firstname? : string;
      lastname? : string;
    } & DefaultSession["user"];
  }

  interface User {
    _id?: string;
    isVerified?: boolean;
    randomId?: number;
    email?: string;
    firstname?: string;
    lastname?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    randomId?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
  }
}
