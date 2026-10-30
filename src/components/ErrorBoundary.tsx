import { Component, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

function ErrorFallbackContent({ error, reset }: { error: Error; reset: () => void }) {
  console.group("[ErrorBoundary] Unhandled error caught");
  console.error("Error:", error);
  console.error("Message:", error.message);
  console.error("Stack:", error.stack);
  console.groupEnd();

  const navigate = useNavigate();
  const copy = useSiteContent().global.errorPage;

  return (
    <>
      <Helmet>
        <title>{copy.metaTitle}</title>
        <meta name="description" content={copy.metaDescription} />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>

          <h1 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
            {copy.title}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">{copy.description}</p>

          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
              {copy.details}
            </summary>
            <pre className="mt-2 max-h-32 overflow-auto rounded-md bg-muted p-3 text-[10px] leading-relaxed text-muted-foreground">
              {error.name}: {error.message}
              {"\n"}
              {error.stack}
            </pre>
          </details>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                reset();
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" /> {copy.retry}
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-full border border-soft-border/60 bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Home className="h-4 w-4" /> {copy.home}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary] componentDidCatch:", error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return <ErrorFallbackContent error={this.state.error} reset={this.handleReset} />;
    }
    return this.props.children;
  }
}
