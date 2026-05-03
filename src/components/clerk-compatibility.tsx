"use client";

import { ClerkProvider, useUser, SignInButton, UserButton } from "@clerk/nextjs";

// Alias ClerkProvider to ClerkWrapper for backwards compatibility with layout.tsx
export const ClerkWrapper = ClerkProvider;

export { useUser, SignInButton, UserButton };
