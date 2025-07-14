import React from "react";

interface PaginationProps {
  steps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ steps, currentStep, onStepChange }) => {
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

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button className="p-2 border rounded-md bg-black text-white hover:bg-gray-900" onClick={handlePrev} disabled={currentStep === 1}>
        Prev
      </button>
      {Array.from({ length: steps }, (_, idx) => {
        const step = idx + 1;
        return (
          <button
            key={step}
            onClick={() => onStepChange(step)}
            style={{
              fontWeight: currentStep === step ? "bold" : "normal",
              border: currentStep === step ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px 8px",
              background: currentStep === step ? "#e7f1ff" : "white",
              cursor: "pointer",
            }}
          >
            {step}
          </button>
        );
      })}
      <button className="p-2 border rounded-md bg-black text-white hover:bg-gray-900" onClick={handleNext} disabled={currentStep === steps}>
        Next
      </button>
    </div>
  );
};

export default Pagination;