'use client';

import { ReactNode } from 'react';
import { ImageGenContext } from '@/hooks/useImageGen';
import { useImageGenState } from '@/hooks/useImageGen';

export function ImageGenProvider({ children }: { children: ReactNode }) {
    const value = useImageGenState();
    return <ImageGenContext.Provider value={value}>{children}</ImageGenContext.Provider>;
}
