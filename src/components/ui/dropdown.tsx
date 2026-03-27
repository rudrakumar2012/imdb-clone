"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Dropdown({ options, value, onChange, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 w-full min-w-[160px]",
          "bg-white/5 border border-white/10",
          "rounded-lg px-4 py-2.5 text-sm font-medium",
          "text-white",
          "hover:bg-white/10 hover:border-[#F5C518]/50",
          "focus:outline-none focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]",
          "transition-all duration-200"
        )}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown
          size={16}
          className={cn(
            "text-neutral-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-2 z-50",
            "bg-neutral-900/95 backdrop-blur-md border border-white/10",
            "rounded-lg shadow-xl shadow-black/50",
            "overflow-hidden",
            "animate-in fade-in slide-in-from-top-1 duration-200"
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-2.5 text-left text-sm font-medium",
                "text-neutral-300 hover:text-white hover:bg-white/10",
                "transition-colors duration-150",
                value === option.value && "bg-[#F5C518]/10 text-[#F5C518]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
