'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class BustErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full w-full items-center justify-center rounded-2xl border border-gold-500/25 bg-parchment-50/50 dark:bg-midnight-900/50">
            <span className="font-display text-5xl text-gold-500/40">Φ</span>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
