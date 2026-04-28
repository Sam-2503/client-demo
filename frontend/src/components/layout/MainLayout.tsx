import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface NavItem {
	label: string;
	path: string;
	icon?: string;
}

interface MainLayoutProps {
	children: React.ReactNode;
	navItems: NavItem[];
	pageTitle?: string;
	pageSubtitle?: string;
	pageActions?: React.ReactNode;
	logo?: string;
	title?: string;
	subtitle?: string;
}

export default function MainLayout({
	children,
	navItems,
	pageTitle,
	pageSubtitle,
	pageActions,
	logo,
	title = "RJS",
	subtitle = "Homes",
}: MainLayoutProps) {
	return (
		<div className="flex h-screen w-full overflow-hidden">
			<Sidebar
				navItems={navItems}
				logo={logo}
				title={title}
				subtitle={subtitle}
			/>
			<div className="flex flex-1 flex-col overflow-hidden">
				{(pageTitle || pageSubtitle || pageActions) && (
					<Topbar
						title={pageTitle}
						subtitle={pageSubtitle}
						actions={pageActions}
					/>
				)}
				<div className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-dark p-6">
					{children}
				</div>
			</div>
		</div>
	);
}
