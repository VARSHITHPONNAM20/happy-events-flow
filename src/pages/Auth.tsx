import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await (await import("@/integrations/supabase/client")).supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a password reset link." });
      setIsForgotPassword(false);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "We sent you a confirmation link to verify your account." });
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-900 border-yellow-600/30">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Ticket className="h-10 w-10 text-yellow-400" />
          </div>
          <CardTitle className="text-2xl text-yellow-400">
            {isForgotPassword ? "Reset Password" : isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isForgotPassword
              ? "Enter your email and we'll send you a reset link"
              : isSignUp
              ? "Sign up to book events and track your tickets"
              : "Sign in to your EventHub account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit}>
          <CardContent className="space-y-4">
            {isSignUp && !isForgotPassword && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-gray-800 border-yellow-600/20 text-white" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-gray-800 border-yellow-600/20 text-white" />
            </div>
            {!isForgotPassword && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="bg-gray-800 border-yellow-600/20 text-white" />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isForgotPassword ? "Send Reset Link" : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            {!isForgotPassword && !isSignUp && (
              <button
                type="button"
                className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot your password?
              </button>
            )}
            <button
              type="button"
              className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
              onClick={() => { setIsSignUp(!isSignUp); setIsForgotPassword(false); }}
            >
              {isForgotPassword
                ? "Back to sign in"
                : isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
