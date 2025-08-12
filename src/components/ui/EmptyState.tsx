import { DivideIcon as LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  className = "",
  children 
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="flex justify-center mb-4">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}