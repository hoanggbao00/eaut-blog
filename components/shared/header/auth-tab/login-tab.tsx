import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThirdAppAuth from "./third-app-auth";

const LoginTab = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <ThirdAppAuth />
        <div className="relative space-y-3">
          <div className="">
            <Label htmlFor="username">Username or email</Label>
            <Input type="text" id="username" placeholder="Username or Email" />
          </div>
          <div className="">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Your password" />
          </div>
          <div className="flex justify-end">
            <TabsList className="bg-transparent">
              <TabsTrigger value="forgot" asChild>
                <p className="cursor-pointer hover:text-primary">
                  Forgot password?
                </p>
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center justify-center">
            <Button className="w-full">Login</Button>
          </div>
          <div className="absolute inset-0 -top-3 grid place-items-center rounded-sm bg-background/70">
            This feature is under development
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginTab;
