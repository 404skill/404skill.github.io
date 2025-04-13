
import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const FlowArrows = () => {
  return (
    <>
      {/* Horizontal arrows between cards */}
      <div className="flow-arrow" style={{ top: '125px', left: '46%' }}>
        <ChevronRight className="flow-arrow-right" />
      </div>
      <div className="flow-arrow" style={{ top: '350px', left: '46%' }}>
        <ChevronRight className="flow-arrow-right" />
      </div>
      <div className="flow-arrow" style={{ top: '575px', left: '46%' }}>
        <ChevronRight className="flow-arrow-right" />
      </div>
      
      {/* Vertical arrows between rows */}
      <div className="flow-arrow" style={{ top: '225px', left: '25%' }}>
        <ChevronDown className="flow-arrow-down" />
      </div>
      <div className="flow-arrow" style={{ top: '225px', left: '75%' }}>
        <ChevronDown className="flow-arrow-down" />
      </div>
      <div className="flow-arrow" style={{ top: '450px', left: '25%' }}>
        <ChevronDown className="flow-arrow-down" />
      </div>
      <div className="flow-arrow" style={{ top: '450px', left: '75%' }}>
        <ChevronDown className="flow-arrow-down" />
      </div>
      
      {/* Connection lines */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal connection lines */}
        <div className="absolute h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 w-[10%] top-[125px] left-[35%] opacity-60"></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 w-[10%] top-[350px] left-[35%] opacity-60"></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 w-[10%] top-[575px] left-[35%] opacity-60"></div>
        
        <div className="absolute h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 w-[10%] top-[125px] left-[55%] opacity-60"></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 w-[10%] top-[350px] left-[55%] opacity-60"></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 w-[10%] top-[575px] left-[55%] opacity-60"></div>
        
        {/* Vertical connection lines */}
        <div className="absolute w-0.5 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 h-[10%] top-[150px] left-[25%] opacity-60"></div>
        <div className="absolute w-0.5 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 h-[10%] top-[150px] left-[75%] opacity-60"></div>
        <div className="absolute w-0.5 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 h-[10%] top-[375px] left-[25%] opacity-60"></div>
        <div className="absolute w-0.5 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 h-[10%] top-[375px] left-[75%] opacity-60"></div>
      </div>
    </>
  );
};

export default FlowArrows;
