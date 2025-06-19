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
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/actions/loginUser";
import { useNavigate } from "react-router-dom";

type State = { email: string; password: string };

export function Login() {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const [input, setInput] = useState<State>({ email: "", password: "" });
  const muation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (error: any) => {
      setError(error.response.data.message!);
    },
  });

  const handleLogin = () => {
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="w-full" onClick={handleLogin}>
          Login
        </Button>
        <CardAction className="w-full text-center">
          <span>Already had an account?</span>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
