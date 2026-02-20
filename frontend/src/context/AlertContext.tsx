"use client";
import { createContext, useContext, useState } from "react";
import Alert from "@/components/alertMessages/alertMessage";

type AlertType = "success" | "error";

type AlertContextType = {
    showAlert: (message: string, type: AlertType) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const [alert, setAlert] = useState<{
        message: string;
        type: AlertType;
    } | null>(null);

    const showAlert = (message: string, type: AlertType) => {
        setAlert({ message, type });
    };

    const closeAlert = () => setAlert(null);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={closeAlert}
                />
            )}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert debe usarse dentro de AlertProvider");
    }
    return context;
}