
import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const FlowArrows = () => {
  return (
    <>
      {/* First row arrows */}
      <div className="flow-arrow" style={{ top: '45%', left: '32%' }}>
        <ChevronRight className="flow-arrow-right" />
      </div>
      <div className="flow-arrow" style={{ top: '45%', left: '65.5%' }}>
        <ChevronRight className="flow-arrow-right" />
      </div>
      
      {/* Down arrows */}
      <div className="flow-arrow" style={{ top: '85%', left: '16.5%' }}>
        <ChevronDown className="flow-arrow-down" />
      </div>
      <div className="flow-arrow" style={{ top: '85%', left: '50%' }}>
        <ChevronDown className="flow-arrow-down" />
      </div>
      <div className="flow-arrow" style={{ top: '85%', left: '83.5%' }}>
        <ChevronDown className="flow-arrow-down" />
      </div>
      
      {/* Bottom row arrows (reverse direction) */}
      <div className="flow-arrow" style={{ top: '145%', left: '65.5%', transform: 'rotate(180deg)' }}>
        <ChevronRight className="flow-arrow-right" />
      </div>
      <div className="flow-arrow" style={{ top: '145%', left: '32%', transform: 'rotate(180deg)' }}>
        <ChevronRight className="flow-arrow-right" />
      </div>
      
      {/* Gradient path effect (optional) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 w-2/3 top-[45%] left-[16.5%] opacity-50"></div>
        <div className="absolute h-2/5 w-0.5 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 top-[45%] left-[16.5%] opacity-50"></div>
        <div className="absolute h-2/5 w-0.5 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 top-[45%] left-[50%] opacity-50"></div>
        <div className="absolute h-2/5 w-0.5 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 top-[45%] left-[83.5%] opacity-50"></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 w-2/3 top-[145%] left-[16.5%] opacity-50"></div>
      </div>
    </>
  );
};

export default FlowArrows;
