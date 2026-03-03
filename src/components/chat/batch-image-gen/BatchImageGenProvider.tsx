'use client';

import { ReactNode } from 'react';
import { BatchImageGenContext } from '@/hooks/useBatchImageGen';
import { useBatchImageGenState } from '@/hooks/useBatchImageGen';

export function BatchImageGenProvider({ children }: { children: ReactNode }) {
    const value = useBatchImageGenState();
    return <BatchImageGenContext.Provider value={value}>{children}</BatchImageGenContext.Provider>;
}
