
import React from "react";
import { RocketIcon, Server, Shield } from "lucide-react";

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-mono mb-4">Why Choose 404Skill?</h2>
          <p className="text-muted-foreground max-w-[42rem] mx-auto">
            Our platform is designed to provide a comprehensive learning experience for backend developers of all levels.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Real-World Projects</h3>
                <p className="text-muted-foreground">
                  Our projects are based on real-world scenarios that you'll encounter in your career as a backend developer.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Industry Best Practices</h3>
                <p className="text-muted-foreground">
                  Learn and apply the latest industry standards and best practices for backend development.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <RocketIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Progressive Learning Path</h3>
                <p className="text-muted-foreground">
                  Start with the basics and gradually advance to more complex concepts and technologies.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-75 animate-pulse"></div>
            <div className="relative bg-background rounded-lg p-6 shadow-xl">
              <div className="rounded-lg overflow-hidden border border-muted">
                <div className="bg-muted p-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-xs font-mono text-muted-foreground">server.js</div>
                </div>
                <pre className="bg-black text-green-400 p-4 text-xs font-mono overflow-x-auto">
                  <code>
{`const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Example route
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`}
                  </code>
                </pre>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium">All tests passing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
