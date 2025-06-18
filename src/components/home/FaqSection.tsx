// src/sections/FaqSection.tsx
import React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need Docker installed?",
    a: "Yes. Each project ships as a containerised starter repo so you can run databases, queues, and the test harness locally in minutes. Docker Desktop (or podman) is all you need.",
  },
  {
    q: "Which programming languages are supported?",
    a: "Any language that can run in a Linux container—Go, Python, Java, C#, Rust, Node, you name it. The CLI just mounts your source folder and executes your tests inside the container.",
  },
  {
    q: "How hard are the projects? Are there beginner-friendly ones?",
    a: "Projects are tiered Rookie → Pro. Rookie projects assume 6 months of coding experience and walk you through fundamentals; Pro projects mimic production outages, distributed tracing, etc.",
  },
  {
    q: "How does the 14-day trial work?",
    a: "Sign up with just an email—no card upfront. You get full access to every project and one free senior code review credit. Keep your work even if you cancel.",
  },
  {
    q: "What if I get stuck?",
    a: "You can run `404skill hint` to reveal incremental tips, ask in our Discord, or book a paid mentor session for line-by-line debugging.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Subscriptions are month-to-month. One click in your dashboard and you won’t be billed again.",
  },
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
