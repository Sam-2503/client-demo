import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from "react";
import "./styles/Toast.css";

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
			{show && <div className="toast">{msg}</div>}
		</ToastContext.Provider>
	);
}

export function useToast(): ToastFn {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
}
