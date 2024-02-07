import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ensureDbConnected } from "@/db/dbConnect";
import { Admin, User } from "@/db/index";

// Define the session strategy type
type SessionStrategy = "jwt" | "database";

// NextAuth options configuration
export const OPTIONS = {
  providers: [
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),

    // Credentials provider for custom login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text", placeholder: "user or admin" },
      },
      async authorize(credentials, req) {
        try {
          // Ensure database connection
          await ensureDbConnected();

          if (!credentials) return null;

          // Destructure credentials
          const { username, password, role } = credentials;

          // Check if credentials are provided
          if (!username || !password || !role) return null;

          // Determine role and find user or admin accordingly
          let entity;
          if (role === "user") {
            entity = await User.findOne({ username });
          } else if (role === "admin") {
            entity = await Admin.findOne({ username });
          }

          // Return null if user/admin not found
          if (!entity) return null;

          // Check if password matches
          const isValid = entity.password === password;
          if (!isValid) return null;

          // Return session data
          return {
            id: entity._id,
            username: entity.username,
            role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null on error
        }
      },
    }),
  ],

  // JWT secret for token signing and verification
  secret: process.env.NEXTAUTH_SECRET as string,

  // Customization of sign-in page route
  pages: {
    signIn: "/login",
  },

  // Session configuration
  session: {
    strategy: "jwt" as SessionStrategy, // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as string, // Use the same secret
  },
};

// Initialize NextAuth with options
const handler = NextAuth(OPTIONS);

// Export handler for both GET and POST requests
export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { ensureDbConnected } from "@/db/dbConnect";
// import { Admin, User } from "@/db/index";

// type SessionStrategy = "jwt" | "database";
// export const OPTIONS = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//         role: { label: "Role", type: "text", placeholder: "user or admin" },
//       },
//       async authorize(credentials, req) {
//         await ensureDbConnected();
//         if (!credentials) return null;
//         const username = credentials?.username as string;
//         const password = credentials?.password as string;
//         const role = credentials?.role as string;
//         if (role == "user") {
//           const user = await User.findOne({ username });
//           if (!user) {
//             return null;
//           }
//           const isValid = user.password == password;

//           if (!isValid) {
//             return null;
//           }
//           return {
//             id: user._id,
//             username: user.username,
//             role: "user",
//           } as any;
//         } else if (role == "admin") {
//           const admin = await Admin.findOne({ username });
//           if (!admin) {
//             return null;
//           }
//           const isValid = admin.password == password;
//           if (!isValid) {
//             return null;
//           }
//           return {
//             id: admin._id,
//             username: admin.username,
//             role: "admin",
//           } as any;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET as string,
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt" as SessionStrategy,
//     maxAge: 30 * 24 * 60 * 60,
//     updateAge: 24 * 60 * 60,
//   },
//   jwt: {
//     // secret: "ApCkh8TcqWk/iCrtpWcGRjndMmwarwjU1ENqpvD6B+Y=",
//     secret: process.env.NEXTAUTH_SECRET as string,
//   },
// };

// const handler = NextAuth(OPTIONS);

// export { handler as GET, handler as POST };
