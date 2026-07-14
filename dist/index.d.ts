import * as react from 'react';
import { ReactNode } from 'react';

type WhispType = 'success' | 'error' | 'info' | 'alert' | 'default';
interface WhispItem {
    id: number;
    message: string;
    type: WhispType;
    icon?: ReactNode;
    closing?: boolean;
}
interface WhispOptions {
    duration?: number;
    icon?: ReactNode;
}
type Listener = (whisps: WhispItem[]) => void;
declare function removeWhisp(id: number): void;
declare function subscribe(listener: Listener): () => void;
declare const whisp: ((message: string, options?: number | WhispOptions) => number) & {
    success: (message: string, options?: number | WhispOptions) => number;
    error: (message: string, options?: number | WhispOptions) => number;
    info: (message: string, options?: number | WhispOptions) => number;
    alert: (message: string, options?: number | WhispOptions) => number;
};
declare const whispStore: {
    subscribe: typeof subscribe;
    removeWhisp: typeof removeWhisp;
};

interface WhisperProps {
    position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}
declare function Whisper({ position }: WhisperProps): react.JSX.Element;

export { type WhispItem, type WhispOptions, type WhispType, Whisper, type WhisperProps, whisp, whispStore };
