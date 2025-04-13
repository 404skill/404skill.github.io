
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Project, Task } from "@/lib/types";
import { useEffect } from "react";

interface HelpRequestFormProps {
  projectId: string;
  taskId?: string;
  projects: Project[];
}

const formSchema = z.object({
  projectId: z.string().min(1, { message: "Please select a project" }),
  taskId: z.string().optional(),
  type: z.enum(["help", "code-review"], {
    required_error: "Please select the type of help you need",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters",
  }),
  codeSnippet: z.string().optional(),
  repositoryUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
});

const HelpRequestForm = ({ projectId, taskId, projects }: HelpRequestFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: projectId || "",
      taskId: taskId || "",
      type: "help",
      description: "",
      codeSnippet: "",
      repositoryUrl: "",
    },
  });

  const selectedProject = projects.find(
    (project) => project.id === form.watch("projectId")
  );
  
  const helpType = form.watch("type");

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission - in a real app, this would send the request to the backend
    console.log(values);
    toast({
      title: "Help request submitted",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }
  
  // Reset codeSnippet or repositoryUrl field based on type selection
  useEffect(() => {
    if (helpType === "help") {
      form.setValue("repositoryUrl", "");
    } else if (helpType === "code-review") {
      form.setValue("codeSnippet", "");
    }
  }, [helpType, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Help</CardTitle>
        <CardDescription>
          Stuck on a problem? Our team of experts is ready to help you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select a project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedProject && (
              <FormField
                control={form.control}
                name="taskId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task (Optional)</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="">Select a specific task</option>
                        {selectedProject.tasks.map((task) => (
                          <option key={task.id} value={task.id}>
                            {task.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormDescription>
                      Select a specific task you need help with, or leave blank for general help.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Help Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="help" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I'm stuck and need help
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="code-review" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I want my code reviewed
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you're struggling with..."
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide as much detail as possible to help us understand your issue.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {helpType === "help" && (
              <FormField
                control={form.control}
                name="codeSnippet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Snippet (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your code here..."
                        className="font-mono resize-y h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      If relevant, include the code you're having trouble with.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {helpType === "code-review" && (
              <FormField
                control={form.control}
                name="repositoryUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/repository"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide a link to your GitHub or other source control repository.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full">
              Submit Request
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HelpRequestForm;
