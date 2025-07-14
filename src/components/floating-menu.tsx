import { cn } from "@/lib/utils";

export default function FloatingMenu({className, children}: {className?: string, children?: React.ReactNode}) {
  
  return (
    <div className={cn("bg-white border-1 border-neutral-200 shadow-md rounded-lg p-4", className)}>
      {children}
    </div>
  );
};