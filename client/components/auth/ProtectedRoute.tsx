import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole?: UserRole | "any";
}) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="p-6">Loading...</div>;

  if (!user) {
    return <Navigate to={`/auth?next=${encodeURIComponent(loc.pathname)}`} replace />;
  }

  if (requiredRole && requiredRole !== "any" && user.role !== requiredRole) {
    // Not authorized
    return (
      <div className="container py-20">
        <div className="rounded-md border bg-card p-6">
          <h3 className="text-xl font-semibold">Access denied</h3>
          <p className="mt-2 text-sm text-muted-foreground">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
