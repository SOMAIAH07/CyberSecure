/** Signal Ledger design reminder: routes preserve task isolation; each workflow lives on its own named dashboard. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import VulnerabilityScan from "./pages/VulnerabilityScan";
import PasswordChecker from "./pages/PasswordChecker";
import SecureLogin from "./pages/SecureLogin";
import PhishingDetection from "./pages/PhishingDetection";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/vulnerability-scan"} component={VulnerabilityScan} />
      <Route path={"/password-checker"} component={PasswordChecker} />
      <Route path={"/secure-login"} component={SecureLogin} />
      <Route path={"/phishing-detection"} component={PhishingDetection} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
