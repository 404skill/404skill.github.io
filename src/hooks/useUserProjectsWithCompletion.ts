// // src/hooks/useUserProjectsWithCompletion.ts
// import { useEffect, useState } from 'react';
// import type { UserProject, ProjectCompletion } from '@/lib/types';
// import { fetchUserProjects, fetchProjectCompletion } from '@/lib/api';
//
// export interface UserProjectWithCompletion extends UserProject {
//   passed: number;
//   total: number;
// }
//
// export function useUserProjectsWithCompletion(): {
//   userProjects: UserProjectWithCompletion[];
//   loading: boolean;
// } {
//   const [userProjects, setUserProjects] = useState<UserProjectWithCompletion[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//
//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchUserProjects('');
//         // 1) map to FE shape, initialize passed/total=0
//         const base: UserProjectWithCompletion[] = data.map((p: any) => ({
//           id: p.projectId,
//           title: p.name,
//           description: p.description,
//           difficulty: p.difficulty,
//           language: p.language,
//           type: p.type,
//           estimatedDurationMinutes: p.estimatedDurationMinutes,
//           accessTier: p.accessTier,
//           repoUrl: p.repoUrl,
//           assignedAt: p.assignedAt,
//           completedAt: p.completedAt,
//           status: p.status,
//           tasks: [],
//           technologies: [],
//           templateUrl: `/templates/${p.projectId}.zip`,
//           passed: 0,
//           total: 0,
//         }));
//
//         // 2) fetch completion for each project
//         const withCompletions = await Promise.all(
//           base.map(async proj => {
//             try {
//               const { passed, total }: ProjectCompletion = await fetchProjectCompletion(proj.id);
//               return { ...proj, passed, total };
//             } catch (err) {
//               console.error(`fetchProjectCompletion failed for ${proj.id}`, err);
//               return { ...proj, passed: 0, total: 0 };
//             }
//           }),
//         );
//
//         setUserProjects(withCompletions);
//       } catch (err) {
//         console.error('useUserProjectsWithCompletion: failed to load', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     load();
//   }, []);
//
//   return { userProjects, loading };
// }
