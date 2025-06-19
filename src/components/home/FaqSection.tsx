// src/sections/FaqSection.tsx
import React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need to install anything?",
    a: "Yes. Each project ships as a containerised starter repository so you can run databases, queues, and the test suites locally in minutes. You will need to download both Docker Desktop and our CLI tool through NPM - See \"Get Started\" Page.",
  },
  {
    q: "How hard are the projects? Are there beginner-friendly ones?",
    a: "There are projects in varying difficulty levels, some are also beginner-friendly and include more guidance and hints.",
  },
  {
    q: "What if I get stuck?",
    a: "Ask questions in the community discord, use the hints and guidance in the project's specs.",
  },
  {
    q: "How do I run tests and submit my solution?",
    a: "You will run the tests using our cli tool, see the \"Get Started\" page."
  },
  {
    q: "How long does a typical project take to complete?",
    a: "Depends on your pace. Some finish a project in a day, others take a week. Each one’s broken into clear checkpoints so you can move at your own speed without getting lost."
  }
];

const FaqSection: React.FC = () => (
  <section id="faq" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12">
        Frequently&nbsp;Asked&nbsp;Questions
      </h2>

      <div className="space-y-4">
        {faqs.map(({ q, a }) => (
          <details
            key={q}
            className="group border border-gray-200 rounded-xl bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4">
              <span className="font-medium text-slate-900">{q}</span>
              <ChevronDown className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed">
              {a}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
