"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

// Sign up
export async function signUpAction(values: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    await auth.api.signUpEmail({
      body: {
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    return {
      success: true,
      message:
        "Account created. Please check your email to verify your account.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// Sign in
export async function signInAction(values: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    await auth.api.signInEmail({
      body: {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    if (error instanceof APIError) {
      // Better Auth returns 403 when email is unverified
      if (error.status === 403) {
        return {
          success: false,
          message: "Please verify your email before signing in.",
          unverified: true,
        };
      }
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// Forgot password
export async function forgotPasswordAction(values: { email: string }) {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email: values.email,
        redirectTo: "/reset-password",
      },
      headers: await headers(),
    });

    // Always return success — don't leak whether the email exists
    return {
      success: true,
      message:
        "If an account exists for that email, a reset link has been sent.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// Reset password
export async function resetPasswordAction(values: {
  password: string;
  token: string;
}) {
  try {
    await auth.api.resetPassword({
      body: {
        newPassword: values.password,
        token: values.token,
      },
      headers: await headers(),
    });

    return { success: true, message: "Password reset successfully." };
  } catch (error) {
    if (error instanceof APIError) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// Sign out
export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
}

// Resend verification email
export async function resendVerificationAction(email: string) {
  try {
    await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    return { success: true, message: "Verification email sent." };
  } catch (error) {
    if (error instanceof APIError) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// Update profile
export async function updateProfileAction(values: { name: string }) {
  try {
    await auth.api.updateUser({
      body: { name: values.name },
      headers: await headers(),
    });
    return { success: true, message: "Profile updated." };
  } catch (error) {
    if (error instanceof APIError)
      return { success: false, message: error.message };
    return { success: false, message: "Something went wrong." };
  }
}

// Delete account
export async function deleteAccountAction() {
  try {
    await auth.api.deleteUser({
      body: {},
      headers: await headers(),
    });
    return { success: true };
  } catch (error) {
    if (error instanceof APIError)
      return { success: false, message: error.message };
    return { success: false, message: "Something went wrong." };
  }
}

// Change password
export async function changePasswordAction(values: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    await auth.api.changePassword({
      body: {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });
    return { success: true, message: "Password updated." };
  } catch (error) {
    if (error instanceof APIError)
      return { success: false, message: error.message };
    return { success: false, message: "Something went wrong." };
  }
}
