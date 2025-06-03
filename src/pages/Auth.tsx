
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { AtSign, KeyRound, UserPlus, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        throw error;
      }
      
      trackEvent({
        eventType: 'user_login',
        component: 'LoginForm',
        eventData: { success: true }
      });
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back to 404Skill!",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      setAuthError(error.message || "Failed to login. Please try again.");
      
      trackEvent({
        eventType: 'user_login_error',
        component: 'LoginForm',
        eventData: { error: error.message }
      });
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  async function onSignupSubmit(values: z.infer<typeof signupSchema>) {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      trackEvent({
        eventType: 'user_signup',
        component: 'SignupForm',
        eventData: { success: true }
      });
      
      toast({
        title: "Account created",
        description: "Welcome to 404Skill!",
      });
      
      // Switch to login tab if email confirmation is required
      if (data.user && !data.session) {
        switchToLogin();
        toast({
          title: "Email verification required",
          description: "Please check your email to verify your account before logging in.",
        });
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setAuthError(error.message || "Failed to create account. Please try again.");
      
      trackEvent({
        eventType: 'user_signup_error',
        component: 'SignupForm',
        eventData: { error: error.message }
      });
      
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "Please try again with different information.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const switchToSignup = () => {
    setAuthError(null);
    const element = document.querySelector('[data-value="signup"]');
    if (element instanceof HTMLElement) {
      element.click();
    }
  };
  
  const switchToLogin = () => {
    setAuthError(null);
    const element = document.querySelector('[data-value="login"]');
    if (element instanceof HTMLElement) {
      element.click();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <UserRound className="h-6 w-6" />
                    Log in
                  </CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
                      {authError}
                    </div>
                  )}
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="you@example.com" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <a className="text-primary underline cursor-pointer" onClick={switchToSignup}>
                      Sign up
                    </a>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <UserPlus className="h-6 w-6" />
                    Create an account
                  </CardTitle>
                  <CardDescription>
                    Enter your details to create a new account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
                      {authError}
                    </div>
                  )}
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="John Doe" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="you@example.com" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <a className="text-primary underline cursor-pointer" onClick={switchToLogin}>
                      Log in
                    </a>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Auth;
