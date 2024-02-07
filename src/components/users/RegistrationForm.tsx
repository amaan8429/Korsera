"use client";

import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Inputs {
  username: string;
  password: string;
  role: string;
}

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  register("password", {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[^ ]+[A-Za-z\d@$!%*?&]*$/,
      message:
        "Password must contain at least one letter, one number, and one special character and should not contain spaces",
    },
  });

  const handleSubmitForm = async (data: Inputs) => {
    const toaster = toast.loading("Creating account...");
    //toaster start
    try {
      console.log(data);
      const res = await axios.post("/api/users/register", data);
      console.log(res);
      //toaster success
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      // toast.success("Account created successfully");
    } catch (error: any) {
      console.log(error);
      //toaster error
      toast.error(error);
    } finally {
      //toaster end
      toast.dismiss(toaster);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
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
          <div className="grid gap-2">
            <Label htmlFor="Username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="amaanuser"
              {...register("username", { required: true })}
            />
            {errors?.username && (
              <span className="text-red-500 text-sm">
                Username must be provided
              </span>
            )}
          </div>
          {/* <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div> */}
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
          <div className="grid gap-2" id="role">
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
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}
