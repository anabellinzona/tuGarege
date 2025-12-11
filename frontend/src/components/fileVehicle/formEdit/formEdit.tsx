import styles from "./formEdit.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { authService } from "@/service/authService";

interface Campo {
    name: string;
    value: string | number | boolean;
    type: 'text' | 'number' | 'textarea' | 'checkbox';
    label: string;
}

type Prop = {
    campos: Campo[];  // ← Cambiar tipo
    idV: number;
    onCloseForm: () => void;
}

export default function FormEdit({ idV, onCloseForm, campos }: Prop) {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Inicializar con los valores recibidos
    useEffect(() => {
        const initialValues: Record<string, any> = {};
        campos.forEach(campo => {
            initialValues[campo.name] = campo.value;
        });
        setFormData(initialValues);
    }, [campos]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let finalValue: any = value;

        if (type === "number") {
            finalValue = Number(value);
        }

        if (type === "checkbox") {
            finalValue = (e.target as HTMLInputElement).checked;
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const token = authService.getToken();

            if (!token) {
                alert("Debes iniciar sesión para modificar vehículos");
                window.location.href = '/quieroVender';
                return;
            }

            if (!token.startsWith('eyJ')) {
                alert("Token inválido. Por favor, vuelve a iniciar sesión.");
                localStorage.removeItem('token');
                window.location.href = '/login';
                return;
            }

            console.log("📤 Enviando al backend:", formData);

            const response = await fetch(`${API_URL}/api/vehiculos/${idV}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            console.log("📥 Response status:", response.status);

            if (response.status === 204) {
                alert("Cambios guardados correctamente");
                window.location.href = `/fichaVehiculo/${idV}`;
                return;
            }

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || "Error al guardar");
            }

            alert("Cambios guardados correctamente");
            onCloseForm();
        } catch (error) {
            console.error("❌ Error:", error);
            alert("No se pudieron guardar los cambios. Inténtelo nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSave();
    };

    if (!formData || Object.keys(formData).length === 0) {
        return <p>Cargando...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className={styles.formProperties}>
            <div className={styles.formComponentsProperties}>
                {campos.map((campo) => (
                    <div key={campo.name} className={styles.inputsAndLabelProperties}>
                        <label>{campo.label}</label>

                        {campo.type === 'textarea' ? (
                            <textarea
                                name={campo.name}
                                placeholder={campo.label}
                                value={formData[campo.name] ?? ""}
                                onChange={handleChange}
                            />
                        ) : campo.type === 'checkbox' ? (
                            <input
                                type="checkbox"
                                name={campo.name}
                                checked={formData[campo.name] ?? false}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type={campo.type}
                                name={campo.name}
                                placeholder={campo.label}
                                value={formData[campo.name] ?? ""}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className={styles.modifeButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Guardando...' : 'Modificar'}
                </button>
            </div>

            <div className={styles.closesButtonProperties}>
                <button type="button" onClick={onCloseForm}>
                    <Image
                        src="/icons/close.png"
                        alt="Cerrar"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </form>
    );
}