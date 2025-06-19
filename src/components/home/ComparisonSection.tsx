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
  <section id="compare" className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-8">
        How 404Skill Compares to Other Options
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-100 rounded-lg overflow-hidden">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-3 text-gray-600 uppercase text-xs">Feature</th>
              <th className="px-4 py-3 text-blue-600 bg-blue-50 font-semibold uppercase text-xs">404Skill</th>
              <th className="px-4 py-3 text-gray-600 uppercase text-xs">Udemy</th>
              <th className="px-4 py-3 text-gray-600 uppercase text-xs">Exercism</th>
              <th className="px-4 py-3 text-gray-600 uppercase text-xs">Bootcamp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.feature}
                className="bg-white  transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-700">{r.feature}</td>
                <td className="px-4 py-3 text-gray-800 bg-blue-50 border-l border-gray-100">
                  {r.skill}
                </td>
                <td className="px-4 py-3 text-gray-700">{r.udemy}</td>
                <td className="px-4 py-3 text-gray-700">{r.exercism}</td>
                <td className="px-4 py-3 text-gray-700">{r.bootcamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default ComparisonSection;