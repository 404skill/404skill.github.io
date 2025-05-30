// // src/components/ContainerAPITab.tsx
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import type { FC } from "react";
//
// export const ContainerAPITab: FC = () => (
//     <div className="mt-6 space-y-6">
//         <div>
//             <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">
//                 Container API Reference
//             </h3>
//             <p className="text-slate-600 mb-4 font-mono">
//                 Your container must implement these standard CLI commands that the test
//                 container will use to interact with your solution.
//             </p>
//         </div>
//
//         <Card className="bg-white border-slate-200">
//             <CardHeader>
//                 <CardTitle className="text-base font-mono text-slate-800">health-check</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <p className="text-sm text-slate-600 mb-2 font-mono">
//                     Verifies that your container is running and ready to receive commands.
//                 </p>
//                 <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
// {`$ container health-check`}
//         </pre>
//                 <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200 mt-3">
// {`{
//   "status": "healthy",
//   "version": "1.0.0"
// }`}
//         </pre>
//             </CardContent>
//         </Card>
//
//         <Card className="bg-white border-slate-200">
//             <CardHeader>
//                 <CardTitle className="text-base font-mono text-slate-800">run-tests</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <p className="text-sm text-slate-600 mb-2 font-mono">
//                     Execute tests against your implementation for a specific task.
//                 </p>
//                 <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
// {`$ container run-tests <task-id>`}
//         </pre>
//                 <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200 mt-3">
// {`{
//   "task": "<task-id>",
//   "passed": true,
//   "tests": { "total": 5, "passed": 5, "failed": 0 },
//   "details": []
// }`}
//         </pre>
//             </CardContent>
//         </Card>
//
//         <Card className="bg-white border-slate-200">
//             <CardHeader>
//                 <CardTitle className="text-base font-mono text-slate-800">get-results</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <p className="text-sm text-slate-600 mb-2 font-mono">
//                     Retrieve detailed results from the most recent test run.
//                 </p>
//                 <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
// {`$ container get-results`}
//         </pre>
//                 <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200 mt-3">
// {`{
//   "task": "<task-id>",
//   "timestamp": "2025-04-14T10:30:00Z",
//   "tests": [
//     { "name": "Functionality Test", "passed": true, "duration_ms": 45 },
//     { "name": "Performance Test",  "passed": true, "duration_ms": 120 }
//   ],
//   "logs": ["Test started at 2025-04-14T10:30:00Z", "All tests passed successfully"]
// }`}
//         </pre>
//             </CardContent>
//         </Card>
//     </div>
// );
