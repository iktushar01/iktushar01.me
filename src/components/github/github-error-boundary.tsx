"use client";

import { Component, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/github/glass-card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GitHubErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <GlassCard className="p-8 text-center" hover={false}>
            <AlertCircle className="size-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
              Unable to load GitHub section
            </p>
            <p className="text-xs text-muted-foreground">
              Check your API token and username configuration.
            </p>
          </GlassCard>
        )
      );
    }

    return this.props.children;
  }
}
