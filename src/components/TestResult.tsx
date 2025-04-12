
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TestResult as TestResultType } from "@/lib/types";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TestResultDisplayProps {
  result: TestResultType;
  taskName: string;
}

const TestResultDisplay = ({ result, taskName }: TestResultDisplayProps) => {
  return (
    <Alert
      variant={result.status === 'passed' ? 'default' : 'destructive'}
      className={`
        ${result.status === 'passed' ? 'border-green-500 bg-green-500/10' : ''} 
        ${result.status === 'failed' ? 'border-red-500 bg-red-500/10' : ''}
        ${result.status === 'not-attempted' ? 'border-yellow-500 bg-yellow-500/10' : ''}
      `}
    >
      <div className="flex items-start">
        {result.status === 'passed' ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : result.status === 'failed' ? (
          <XCircle className="h-5 w-5 text-red-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-yellow-500" />
        )}
        <div className="ml-3 w-full">
          <div className="flex justify-between items-center">
            <AlertTitle>{taskName}</AlertTitle>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
            </span>
          </div>
          <AlertDescription className="mt-1">
            {result.status === 'passed' 
              ? 'All tests passed successfully!' 
              : result.errorMessage || 'Test failed'}
          </AlertDescription>
          
          {result.errorMessage && (
            <pre className="mt-2 p-2 bg-card rounded text-xs font-mono overflow-x-auto">
              {result.errorMessage}
            </pre>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default TestResultDisplay;
