import React from "react";
import { useAuth } from "../../context/AuthContext";
import "../styles/Topbar.css";

interface TopbarProps {
	title?: string;
	subtitle?: string;
	actions?: React.ReactNode;
}

export default function Topbar({ title, subtitle, actions }: TopbarProps) {
	const { user } = useAuth();

	const getInitials = (fullName: string) => {
		return fullName
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<div className="topbar">
			<div className="topbar-left">
				{title && <h1 className="topbar-title">{title}</h1>}
				{subtitle && <p className="topbar-subtitle">{subtitle}</p>}
			</div>

			<div className="topbar-right">
				{actions && <div className="topbar-actions">{actions}</div>}
				{user && (
					<div className="topbar-user">
						<div className="topbar-avatar">
							{getInitials(user.full_name)}
						</div>
						<div>
							<div className="topbar-user-name">
								{user.full_name}
							</div>
							<div className="topbar-user-role">{user.role}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
