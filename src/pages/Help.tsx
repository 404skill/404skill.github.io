import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { AlertCircle, CheckCircle, Clock, HelpCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Help = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('sb-smzmwxqzmiswsnvsvjms-auth-token');
    if (!userStr) {
      navigate('/auth');
      return;
    }

    const _parsedUserData = JSON.parse(userStr).user.user_metadata;
    const userData = {
      id: _parsedUserData.sub,
      name: _parsedUserData.name,
      email: _parsedUserData.email,
    } as User;
    setUser(userData);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Get Help</h1>
              <p className="text-muted-foreground">
                Stuck on a problem? Our team of experts is ready to help you.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-6">
              <Tabs defaultValue="new-request">
                <TabsList className="mb-4">
                  <TabsTrigger value="new-request" className="flex items-center gap-1">
                    <HelpCircle className="h-4 w-4" />
                    New Request
                  </TabsTrigger>
                  <TabsTrigger value="my-requests" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    My Requests
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="my-requests">
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Clock className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">Help with MongoDB connection issue</h3>
                                <p className="text-sm text-muted-foreground">
                                  RESTful API with Express • 2 days ago
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="ml-2 bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                              >
                                Pending
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                              I'm having trouble connecting to MongoDB in my Express application. I
                              keep getting a connection error...
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">
                                  Code review for authentication implementation
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  RESTful API with Express • 1 week ago
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="ml-2 bg-blue-500/10 text-blue-300 border-blue-500/20"
                              >
                                In Progress
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                              I've implemented JWT authentication but I'm not sure if my approach is
                              secure enough...
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">Help with Express middleware</h3>
                                <p className="text-sm text-muted-foreground">
                                  RESTful API with Express • 2 weeks ago
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="ml-2 bg-green-500/10 text-green-300 border-green-500/20"
                              >
                                Resolved
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                              I need help understanding how to create and use custom middleware in
                              Express...
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How it works</CardTitle>
                  <CardDescription>Get help from our experts when you're stuck</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Submit a request</h4>
                      <p className="text-sm text-muted-foreground">
                        Describe the issue you're facing or request a code review
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Expert review</h4>
                      <p className="text-sm text-muted-foreground">
                        Our team of experts will review your request
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Get personalized help</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive guidance and solutions tailored to your specific issue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tips for good requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Be specific about what you're trying to achieve
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Include relevant code snippets with proper formatting
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Explain what you've already tried to solve the problem
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Share any error messages you're receiving
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
