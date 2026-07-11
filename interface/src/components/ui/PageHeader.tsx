import React from 'react';
import EnvironmentBadge from './EnvironmentBadge';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-headline-md font-bold text-on-surface">
                        {title}
                    </h2>
                    <EnvironmentBadge />
                </div>
                {description && (
                    <p className="text-on-surface-variant font-body-md mt-1">
                        {description}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
}
