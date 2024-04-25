import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThirdAppAuth from "./third-app-auth";

const RegisterTab = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <ThirdAppAuth />
        <div className="relative space-y-3">
          <div className="">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Your password" />
          </div>
          <div className="">
            <Label htmlFor="repassword">Repeat password</Label>
            <Input
              type="password"
              id="repassword"
              placeholder="Repeat your password"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button className="w-full">Register</Button>
          </div>
          <div className="absolute inset-0 -top-3 grid place-items-center rounded-sm bg-background/70">
            This feature is under development
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterTab;
