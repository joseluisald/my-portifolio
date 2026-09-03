import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">JLA Code / 404</p>
        <h1 className="mt-5 font-display text-7xl font-semibold tracking-[-0.08em]">Ops.</h1>
        <p className="mt-4 text-muted-foreground">Essa página não existe, mas a próxima ideia pode existir.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">
          <ArrowLeft className="h-4 w-4" />
          Voltar para o início
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
