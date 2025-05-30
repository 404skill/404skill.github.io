// // src/components/DetailsTab.tsx
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import type { FC } from "react";
// import type { Project } from "@/lib/types";
// import ProjectMarkdownContent from "@/components/ProjectMarkdownContent";
// import {Button} from "react-day-picker";
// import {Download} from "lucide-react";
//
// interface DetailsTabProps {
//     project: Project;
// }
//
// export const DetailsTab: FC<DetailsTabProps> = ({ project }) => (
//     <div className="mt-6 space-y-6">
//         {project.id === "library_management" ? (
//             <div className="bg-white p-6 rounded-lg border border-slate-200 overflow-hidden">
//                 <div
//                     className="prose prose-slate max-w-none
//                      prose-headings:font-mono prose-headings:text-slate-800
//                      prose-p:text-slate-600 prose-p:leading-relaxed
//                      prose-code:bg-slate-100 prose-code:p-0.5 prose-code:rounded
//                      prose-li:marker:text-slate-400
//                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
//                 >
//                     <ProjectMarkdownContent filePath="library_management/0_overview.md" />
//                 </div>
//             </div>
//         ) : (
//             <>
//                 <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">
//                     Project Overview
//                 </h3>
//                 <p className="text-slate-600 font-mono">
//                     {project.description} This project uses containerization to allow you to
//                     implement a solution in any programming language of your choice.
//                 </p>
//
//                 <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">
//                     Learning Objectives
//                 </h3>
//                 <ul className="list-disc pl-5 text-slate-600 space-y-1 font-mono">
//                     <li>Building containerized applications with proper isolation</li>
//                     <li>Creating solutions that can be tested through a standardized CLI API</li>
//                     <li>Working with cross-container communication patterns</li>
//                     <li>Implementing efficient and clean solutions to real-world problems</li>
//                     <li>Writing portable code that works consistently across environments</li>
//                 </ul>
//
//                 <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">
//                     Prerequisites
//                 </h3>
//                 <ul className="list-disc pl-5 text-slate-600 space-y-1 font-mono">
//                     <li>Basic understanding of containerization (Docker or similar)</li>
//                     <li>Familiarity with your chosen programming language</li>
//                     <li>Understanding of CLI interfaces and APIs</li>
//                     <li>Git for version control</li>
//                 </ul>
//
//                 <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">
//                     Getting Started
//                 </h3>
//                 <Card className="bg-white border-slate-200">
//                     <CardHeader>
//                         <CardTitle className="font-mono text-slate-800">
//                             Step 1: Download the template
//                         </CardTitle>
//                         <CardDescription className="text-slate-500 font-mono">
//                             Get started with our container template and test suite
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <p className="text-sm text-slate-600 mb-4 font-mono">
//                             The template includes a starter container configuration and
//                             documentation on how to interact with the test container through the
//                             standard API.
//                         </p>
//                         <Button onClick={() => {/* propagate up */}} className="font-mono bg-blue-600 hover:bg-blue-700 text-white">
//                             <Download className="mr-2 h-4 w-4" />
//                             Download Template
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </>
//         )}
//     </div>
// );
