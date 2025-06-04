import React from 'react';
import { CheckCircle } from 'lucide-react';
import TeamMember from './TeamMember';

const TeamSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold font-mono mb-2">
            Learn From FAANG Engineering Leaders
          </h2>
          <p className="text-muted-foreground max-w-[42rem] mx-auto">
            Get personalized mentorship and code reviews from senior engineers at top tech
            companies. We don't just provide projects - we offer a complete learning ecosystem with
            expert feedback, career guidance, and portfolio building support to help you land your
            dream job.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <TeamMember 
            name="Eliran Turgeman" 
            role="Co-Founder & CTO" 
            company="Software Engineer @ Microsoft" 
            avatar="/placeholder.svg" 
          />
          <TeamMember 
            name="Sarah Patel" 
            role="Co-Founder & Lead Mentor" 
            company="Ex-Amazon Principal SDE" 
            avatar="/placeholder.svg" 
          />
          <TeamMember 
            name="Marcus Kim" 
            role="Head of Curriculum" 
            company="Ex-Netflix Tech Lead" 
            avatar="/placeholder.svg" 
          />
        </div> */}

        <div className="mt-12 p-6 bg-card rounded-lg border max-w-3xl mx-auto shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full mt-1">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="italic text-muted-foreground">
                "Our mission is to bridge the gap between theoretical knowledge and practical
                backend engineering skills. Every project is designed based on real challenges we've
                faced at scale, and our team of industry experts provides personalized feedback,
                code reviews, and career guidance to help you succeed."
              </p>
              <p className="mt-3 font-medium">— 404Skill Founding Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
