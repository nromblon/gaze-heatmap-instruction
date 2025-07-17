import React from "react";

interface PaginationProps {
  steps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
  maxVisibleSteps?: number;
}

const Pagination: React.FC<PaginationProps> = ({ steps, currentStep, onStepChange, maxVisibleSteps }) => {
  if (maxVisibleSteps === undefined) {
    maxVisibleSteps = steps; // Default to the total number of steps if not provided
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps) {
      onStepChange(currentStep + 1);
    }
  };

  const getVisibleSteps = () => {
    if (steps <= maxVisibleSteps) {
      return Array.from({ length: steps }, (_, idx) => idx + 1);
    }

    const visibleSteps: (number | string)[] = [];
    const sideSteps = Math.floor((maxVisibleSteps - 3) / 2); // Reserve 3 spots for first, last, and ellipsis

    if (currentStep <= sideSteps + 2) {
      // Current step is near the beginning
      for (let i = 1; i <= maxVisibleSteps - 2; i++) {
        visibleSteps.push(i);
      }
      visibleSteps.push('...');
      visibleSteps.push(steps);
    } else if (currentStep >= steps - sideSteps - 1) {
      // Current step is near the end
      visibleSteps.push(1);
      visibleSteps.push('...');
      for (let i = steps - maxVisibleSteps + 3; i <= steps; i++) {
        visibleSteps.push(i);
      }
    } else {
      // Current step is in the middle
      visibleSteps.push(1);
      visibleSteps.push('...');
      for (let i = currentStep - sideSteps; i <= currentStep + sideSteps; i++) {
        visibleSteps.push(i);
      }
      visibleSteps.push('...');
      visibleSteps.push(steps);
    }

    return visibleSteps;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button className="p-2 border rounded-md bg-black text-white hover:bg-neutral-900" onClick={handlePrev} disabled={currentStep === 1}>
        Prev
      </button>
      {getVisibleSteps().map((step, idx) => {
        if (step === '...') {
          return (
            <span key={`ellipsis-${idx}`} style={{ padding: "4px 8px" }}>
              ...
            </span>
          );
        }
        
        const stepNum = step as number;
        return (
          <button
            key={stepNum}
            onClick={() => onStepChange(stepNum)}
            style={{
              fontWeight: currentStep === stepNum ? "bold" : "normal",
              border: currentStep === stepNum ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px 8px",
              background: currentStep === stepNum ? "#e7f1ff" : "white",
              cursor: "pointer",
            }}
          >
            {stepNum}
          </button>
        );
      })}
      <button className="p-2 border rounded-md bg-black text-white hover:bg-neutral-900" onClick={handleNext} disabled={currentStep === steps}>
        Next
      </button>
    </div>
  );
};

export default Pagination;