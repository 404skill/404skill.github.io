
import React from "react";
import { TechIcons } from "./IconsContainer";

const TechStackSection = () => {
  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="container">
        <h2 className="mb-10 text-center text-2xl font-bold font-mono">Technologies You'll Master</h2>
        <TechIcons />
      </div>
    </section>
  );
};

export default TechStackSection;
