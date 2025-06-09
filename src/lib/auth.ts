import * as schema from "@/db/schema";

import { betterAuth } from "better-auth";
import { db } from "@/db"; // your drizzle instance
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
          ...schema,
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
});