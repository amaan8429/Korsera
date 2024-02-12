"use client";
import React from "react";
import { CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IUserRegister {
  email: string;
  password: string;
  role: string;
}

export default function LoginForm() {
  // To redirect user use use router
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUserRegister>({
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });

  register("password", {
    required: "Password is required",
    // pattern: {
    //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[^ ]+[A-Za-z\d@$!%*?&]*$/,
    //   message: "Password must contain at least one letter, one number, and one special character and should not contain spaces",
    // },
  });

  register("email", {
    required: "Email address is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address format",
    },
  });

  const handleSubmitForm = async (data: IUserRegister) => {
    // toast loading
    const toastLoading = toast.loading("processing...");
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        role: data.role,
        redirect: false,
      });
      console.log("response", response);
      toast.success("Successfully signed in");
      router.push("/ad/dashboard");

      // toast success
    } catch (error: any) {
      // toast error
      toast.error("Failed!", error?.message);
    } finally {
      // toast close
      toast.dismiss(toastLoading);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors?.email && (
              <span className="text-red-500 text-sm">
                {" "}
                {errors?.email?.message}{" "}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors?.password && (
              <span className="text-red-500 text-sm">
                {" "}
                {errors?.password?.message}{" "}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              {...(register("role"), { required: true })}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors?.role && (
              <span className="text-red-500 text-sm">
                {" "}
                Role must be provided{" "}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
