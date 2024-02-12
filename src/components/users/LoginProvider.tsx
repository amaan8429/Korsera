"use client";
import React from "react";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function LoginProvider() {
  return (
    <div>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
