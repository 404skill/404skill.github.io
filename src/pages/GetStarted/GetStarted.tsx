// src/pages/GetStarted.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Terminal, UserPlus, Package, Code, Play } from 'lucide-react';
import { NpmStatsApi } from './../../lib/npmApi';

const GetStarted = () => {
  const navigate = useNavigate();
  const npmApi = new NpmStatsApi();
  const [user, setUser] = useState<User | null>(null);
  const [downloadsToday, setDownloadsToday] = useState<number | null>(null);
  const [isDownloadsLoading, setIsDownloadsLoading] = useState<boolean>(true);

  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [isVersionLoading, setIsVersionLoading] = useState<boolean>(true);

  useEffect(() => {
    const userStr = localStorage.getItem('sb-smzmwxqzmiswsnvsvjms-auth-token');
    if (!userStr) {
      navigate('/auth');
      return;
    }
    const _parsedUserData = JSON.parse(userStr).user.user_metadata;
    setUser({
      id: _parsedUserData.sub,
      name: _parsedUserData.name,
      email: _parsedUserData.email,
    });
  }, [navigate]);

  useEffect(() => {
    async function fetchNpmStats() {
      try {
        const dl = await npmApi.getDownloadCount('404skill', 'last-day');
        setDownloadsToday(dl.downloads);
      } catch (err) {
        console.error('Failed to fetch npm downloads:', err);
        setDownloadsToday(null);
      } finally {
        setIsDownloadsLoading(false);
      }

      try {
        const ver = await npmApi.getCurrentVersion('404skill');
        setCurrentVersion(ver);
      } catch (err) {
        console.error('Failed to fetch npm current version:', err);
        setCurrentVersion(null);
      } finally {
        setIsVersionLoading(false);
      }
    }

    fetchNpmStats();
  }, [npmApi]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1 font-mono">Get Started</h1>
              <p className="text-muted-foreground">
                Follow these six steps to set up your environment and begin solving projects.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="shadow-md">
              <CardContent className="flex items-start gap-4 p-6">
                <Download className="h-6 w-6 text-purple-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold font-mono text-lg">
                    1. Download CLI Tool
                    {isVersionLoading && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Loading version…
                    </p>
                  )}
                  {!isVersionLoading && currentVersion && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Latest version on npm: <strong>{currentVersion}</strong>
                    </p>
                  )}

                  {isDownloadsLoading && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Loading downloads…
                    </p>
                  )}
                  {!isDownloadsLoading && downloadsToday !== null && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Downloaded <strong>{downloadsToday.toLocaleString()}</strong> times in
                      the last 24 hours.
                    </p>
                  )}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Grab our official CLI package from npm (e.g. run{' '}
                    <code className="bg-slate-100 px-1 rounded">npm install -g 404skill</code>)
                    from your terminal, and install it globally.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-100">
              <CardContent className="flex items-start gap-4 p-6">
                <Terminal className="h-6 w-6 text-blue-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold font-mono text-lg">2. Verify CLI Installation</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    In your terminal, run{' '}
                    <code className="bg-slate-200 px-1 rounded">404skill</code> to ensure
                    the CLI is installed correctly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-6 text-center">
                <UserPlus className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold font-mono text-lg mb-2">3. Register Your Account</h3>
                <p className="text-sm text-muted-foreground">
                  Follow the interactive prompts to link your account with the CLI.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border border-blue-200">
              <CardContent className="p-6 text-center">
                {/* Icon now in blue */}
                <Package className="h-8 w-8 text-blue-500 mx-auto mb-3" />

                <h3 className="font-semibold font-mono text-lg mb-2">
                  4. Import Your First Project
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  Choose a project from our catalog and download it to pull down the starter template and pre-made tests locally.
                </p>

                <Link to="/dashboard">
                  <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded font-mono text-sm hover:bg-blue-600 transition">
                    Browse Available Projects
                  </button>
                </Link>
              </CardContent>
            </Card>

            <div className="rounded-lg bg-indigo-50 border-l-4 border-indigo-500 p-6">
              <div className="flex items-start gap-4">
                <Code className="h-6 w-6 text-indigo-500 mt-1" />
                <div>
                  <h3 className="font-semibold font-mono text-lg mb-1">5. Code and Solve</h3>
                  <p className="text-sm text-muted-foreground">
                    Open the imported project in your favorite editor, write your solution, and
                    verify everything builds/runs locally. Feel free to explore and experiment with
                    the starter code.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-2 border-blue-500">
              <CardContent className="flex items-start gap-4 p-6">
                <Play className="h-6 w-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold font-mono text-lg">6. Run Tests</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use the CLI to execute the
                    built-in test suite. You’ll see its output in real time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStarted;
