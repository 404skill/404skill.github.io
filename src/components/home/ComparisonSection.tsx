// src/sections/ComparisonSection.tsx
import React from "react";

const rows = [
  {
    feature: "Learning format",
    skill: "Learn by building real-world software",
    udemy: "Pre-recorded video lectures",
    exercism: "Small scope exercises",
    bootcamp: "Live instructor-led cohort",
  },
  {
    feature: "Project scope",
    skill: "Comprehensive production-grade software",
    udemy: "Toy demo apps",
    exercism: "Micro-exercises",
    bootcamp: "Simple CRUD apps",
  },
  {
    feature: "Automated test suite",
    skill: "✔️",
    udemy: "❌",
    exercism: "✔️",
    bootcamp: "❌",
  },
  {
    feature: "Guidance and code reviews",
    skill: "✔️ (TBA)",
    udemy: "❌",
    exercism: "✔️ (volunteer)",
    bootcamp: "✔️ (instructor/TA)",
  },
  {
    feature: "Career / job support",
    skill: "✔️ (TBA)",
    udemy: "❌",
    exercism: "❌",
    bootcamp: "Job-placement help",
  },
  {
    feature: "Typical cost",
    skill: "Free",
    udemy: "$15-30 per course",
    exercism: "Free",
    bootcamp: "> $5,000",
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
        How 404Skill Compares to Other Options
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
