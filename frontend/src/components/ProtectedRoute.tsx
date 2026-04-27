import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

interface Props {
	children: React.ReactNode;
	roles: UserRole[];
}

export default function ProtectedRoute({ children, roles }: Props) {
	const { user } = useAuth();

	if (!user) return <Navigate to="/login" replace />;

	if (!roles.includes(user.role)) {
		return (
			<Navigate
				to={user.role === "client" ? "/client" : "/builder"}
				replace
			/>
		);
	}

	return <>{children}</>;
}
