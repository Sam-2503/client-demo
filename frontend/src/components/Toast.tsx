import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from "react";

type ToastFn = (msg: string) => void;

const ToastContext = createContext<ToastFn | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [msg, setMsg] = useState("");
	const [show, setShow] = useState(false);

	const toast = useCallback((message: string) => {
		setMsg(message);
		setShow(true);
		setTimeout(() => setShow(false), 10000);
	}, []);

	return (
		<ToastContext.Provider value={toast}>
			{children}
			{show && (
				<div className="fixed bottom-6 left-1/2 z-[9999] flex max-w-[400px] -translate-x-1/2 items-center gap-4 rounded-md border border-brand-border border-l-4 border-l-brand-gold bg-brand-card px-6 py-4 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] animate-fade-in">
					{msg}
				</div>
			)}
		</ToastContext.Provider>
	);
}

export function useToast(): ToastFn {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
}
