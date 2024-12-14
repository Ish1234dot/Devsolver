import React from 'react';

interface ResponseSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export function ResponseSection({ icon, title, children }: ResponseSectionProps) {
  return (
    <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 w-full">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        {icon}
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}