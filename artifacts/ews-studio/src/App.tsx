import { type ReactNode, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Admin from '@/pages/admin';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
  Redirect
} from 'wouter';
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';

const queryClient = new QueryClient();

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env file');
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "hsl(0 0% 0%)",
    colorForeground: "hsl(0 0% 0%)",
    colorMutedForeground: "hsl(0 0% 45%)",
    colorDanger: "hsl(0 100% 50%)",
    colorBackground: "hsl(0 0% 100%)",
    colorInput: "transparent",
    colorInputForeground: "hsl(0 0% 0%)",
    colorNeutral: "hsl(0 0% 90%)",
    fontFamily: "'Montserrat', sans-serif",
    borderRadius: "0rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-background rounded-none border border-border w-[440px] max-w-full overflow-hidden shadow-none",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-foreground font-bold tracking-tight uppercase",
    headerSubtitle: "text-muted-foreground text-sm mt-1",
    socialButtonsBlockButtonText: "text-foreground font-semibold uppercase tracking-widest text-xs",
    formFieldLabel: "text-muted-foreground font-semibold uppercase tracking-widest text-xs",
    footerActionLink: "text-foreground hover:text-foreground/80 transition-colors uppercase tracking-widest text-[10px] font-bold",
    footerActionText: "text-muted-foreground uppercase tracking-widest text-[10px]",
    dividerText: "text-muted-foreground uppercase tracking-widest text-[10px]",
    identityPreviewEditButton: "text-foreground hover:text-foreground/80",
    formFieldSuccessText: "text-foreground",
    alertText: "text-destructive font-semibold text-xs",
    logoBox: "mb-8 flex justify-center",
    logoImage: "h-8",
    socialButtonsBlockButton: "border border-border rounded-none hover:bg-muted/50 transition-colors py-3",
    formButtonPrimary: "bg-foreground text-background hover:bg-foreground/90 rounded-none uppercase tracking-widest text-xs font-semibold py-3",
    formFieldInput: "border-b border-border bg-transparent rounded-none focus:outline-none focus:border-foreground transition-colors px-0 py-2 text-sm",
    footerAction: "mt-6 pt-6 border-t border-border",
    dividerLine: "bg-border",
    alert: "bg-destructive/10 border border-destructive/20 rounded-none p-3",
    otpCodeFieldInput: "border border-border rounded-none focus:border-foreground text-foreground",
    formFieldRow: "mb-5",
    main: "flex flex-col gap-4",
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 bg-grid">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 bg-grid">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const queryClient = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        queryClient.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, queryClient]);

  return null;
}

function AdminRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Admin />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={AdminRedirect} />
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/sign-up/*?" component={SignUpPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Access Studio",
            subtitle: "Sign in to EWS Base",
          },
        },
        signUp: {
          start: {
            title: "Create Access",
            subtitle: "Register for EWS Base",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;