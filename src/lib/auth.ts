import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? `https://${process.env.VERCEL_URL}`,
  secret: process.env.BETTER_AUTH_SECRET!,

  trustedOrigins: [
    "https://bookmark-manager-ignite.vercel.app",
    "http://localhost:3000",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Bookmark Manager password",
        html: `
          <p>Hi ${user.name},</p>
          <p>Click the link below to reset your password:</p>
          <a href="${url}">${url}</a>
          <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        `,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your Bookmark Manager account",
        html: `
          <p>Hi ${user.name},</p>
          <p>Click the link below to verify your email address:</p>
          <a href="${url}">${url}</a>
          <p>After verifying, you can log in from any device.</p>
          <p>This link expires in 24 hours.</p>
        `,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Confirm your email change",
          html: `
            <p>Hi ${user.name},</p>
            <p>Click the link below to confirm your new email address:</p>
            <a href="${url}">${url}</a>
            <p>If you didn't request this, ignore this email.</p>
          `,
        });
      },
    },
    deleteUser: {
      enabled: true,
    },
  },

  advanced: {
    useSecureCookies: true,
    cookies: {
      session_token: {
        attributes: {
          sameSite: "lax",
          secure: true,
          httpOnly: true,
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
