import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/actions/loginUser";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { registerUser } from "@/actions/registerUser";

type State = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
};

export function Register() {
  const queryClient = useQueryClient();
  const { user, isLoading } = useAuthContext();
  if (!isLoading && user) {
    return <Navigate to="/dashboard/tasks" />;
  }
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const [input, setInput] = useState<State>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "user",
  });
  const muation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      //   queryClient.invalidateQueries();
      navigate("/auth/login");
    },
    onError: (error: any) => {
      setError(error.response.data.message!);
    },
  });

  const handleRegister = () => {
    muation.mutate(input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Card className="w-full max-w-sm h-full mx-auto mt-10">
      <CardHeader>
        <CardTitle>Login to ZIGVY TODO</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="transition-all duration-700">
          <div className="flex flex-col gap-6">
            {error && (
              <span className="block w-full text-center py-2 px-2 bg-red-200 text-red-600 rounded-sm">
                {error}
              </span>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                value={input.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={input.password}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="firstName">First Name</Label>
              </div>
              <Input
                id="firstName"
                type="firstName"
                placeholder="Khang"
                name="firstName"
                required
                value={input.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="lastName">Last Name</Label>
              </div>
              <Input
                id="lastName"
                type="lastName"
                placeholder="Nguyen"
                name="lastName"
                required
                value={input.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2 mb-8">
              <Label>Role</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {input.role === "admin" ? "Admin" : "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setInput({ ...input, role: "user" })}
                  >
                    User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    disabled={user?.role !== "admin"}
                    onClick={() => setInput({ ...input, role: "admin" })}
                  >
                    Admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="w-full" onClick={handleRegister}>
          Login
        </Button>
        <CardAction className="w-full text-center">
          <span>Already had an account?</span>
          <Link to="/auth/login" className="ml-3 text-violet-500">
            Login
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
