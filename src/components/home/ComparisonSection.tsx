// src/sections/ComparisonSection.tsx
import React from "react";

const rows = [
  {
    feature: "Learning format",
    skill: "Interactive projects + local test-runner",
    udemy: "Pre-recorded video lectures",
    exercism: "Small text-based exercises",
    bootcamp: "Live instructor-led cohort",
  },
  {
    feature: "Project scope",
    skill: "Production-style back-end systems",
    udemy: "Toy demo apps",
    exercism: "Micro-exercises",
    bootcamp: "Capstone projects (varies)",
  },
  {
    feature: "Automated test suite",
    skill: "✔️",
    udemy: "❌",
    exercism: "✔️",
    bootcamp: "➖",
  },
  {
    feature: "Senior code review",
    skill: "✔️ (paid tier)",
    udemy: "❌",
    exercism: "✔️ (volunteer)",
    bootcamp: "✔️ (instructor/TA)",
  },
  {
    feature: "Language coverage",
    skill: "Polyglot via Docker",
    udemy: "Course-specific",
    exercism: "77 languages",
    bootcamp: "1 primary stack",
  },
  {
    feature: "Career / job support",
    skill: "Portfolio & community review",
    udemy: "❌",
    exercism: "❌",
    bootcamp: "Job-placement help",
  },
  {
    feature: "Typical cost",
    skill: "$29 / mo",
    udemy: "$15-30 per course",
    exercism: "Free",
    bootcamp: "$12k-14k",
  },
  {
    feature: "Time commitment",
    skill: "Self-paced",
    udemy: "Self-paced",
    exercism: "Self-paced",
    bootcamp: "30-60 h/week",
  },
];

const ComparisonSection: React.FC = () => (
  <section id="compare" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6 overflow-x-auto">
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12">
        Why 404Skill Beats Other Options
      </h2>

      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Feature</th>
            <th className="px-4 py-2 font-semibold text-primary">404Skill</th>
            <th className="px-4 py-2">Udemy</th>
            <th className="px-4 py-2">Exercism</th>
            <th className="px-4 py-2">Bootcamp</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.feature} className="border-b last:border-none">
              <td className="px-4 py-3 font-medium">{r.feature}</td>
              <td className="px-4 py-3">{r.skill}</td>
              <td className="px-4 py-3">{r.udemy}</td>
              <td className="px-4 py-3">{r.exercism}</td>
              <td className="px-4 py-3">{r.bootcamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default ComparisonSection;
