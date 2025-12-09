import styles from "./formEdit.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { authService } from "@/service/authService";

type Prop = {
    parametrosForm: string[],
    idV: number,
    onCloseForm: () => void
}

export default function FormEdit({ idV, onCloseForm, parametrosForm }: Prop) {
    const [closeButton, setCloseButton] = useState(false);
    const [editedVehiculo, setEditedVehiculo] = useState<any>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // ⭐ INICIALIZAR DINÁMICAMENTE LOS CAMPOS SEGÚN parametrosForm
    useEffect(() => {
        const initialValues: any = {};

        parametrosForm.forEach((campo) => {
            if (["km", "anio", "precio"].includes(campo)) {
                initialValues[campo] = 0;
            } else if (campo === "destacado") {
                initialValues[campo] = false;
            } else {
                initialValues[campo] = "";
            }
        });

        initialValues.id = idV;
        setEditedVehiculo(initialValues);
    }, [idV, parametrosForm]);

    // ⭐ CAMBIOS EN INPUTS (automático según tipo)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editedVehiculo) return;

        const { name, value, type } = e.target;

        let finalValue: any = value;

        if (type === "number") {
            finalValue = Number(value);
        }

        if (type === "checkbox") {
            finalValue = (e.target as HTMLInputElement).checked;
        }

        setEditedVehiculo({ ...editedVehiculo, [name]: finalValue });
    };

    // ⭐ GUARDADO
    const handleSave = async () => {
        if (!editedVehiculo) return;

        try {
            const token = localStorage.getItem('token');

            console.log(token)

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

            const response = await fetch(`${API_URL}/api/vehiculos/${idV}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(editedVehiculo)
            });

            const text = await response.text();

            if (response.status == 204) {
                alert("Cambios guardados correctamente");
                window.location.href = `/fichaVehiculo/${idV}`;
                return;
            }

            if (!response.ok) throw new Error(text);

            alert("Cambios guardados correctamente");
        } catch {
            alert("No se pudieron guardar los cambios. Inténtelo nuevamente.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSave();
    };

    if (closeButton) return null;

    if (!editedVehiculo) return <p>Cargando...</p>;

    return (
        <form onSubmit={handleSubmit} className={styles.formProperties}>
            <div className={styles.formComponentsProperties}>

                {/* ⭐ GENERACIÓN AUTOMÁTICA DE INPUTS */}
                {parametrosForm.map((parametro, index) => (
                    <div key={index} className={styles.inputsAndLabelProperties}>
                        <label>{parametro}</label>

                        {parametro === "descripcion" ? (
                            <textarea
                                name={parametro}
                                placeholder={parametro}
                                value={editedVehiculo[parametro] ?? ""}
                                onChange={handleChange}
                            ></textarea>
                        ) : parametro === "destacado" ? (
                            <input
                                type="checkbox"
                                name={parametro}
                                checked={editedVehiculo[parametro] ?? false}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                placeholder={parametro}
                                type={["km", "anio", "precio"].includes(parametro) ? "number" : "text"}
                                name={parametro}
                                value={editedVehiculo[parametro] ?? ""}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}

                <button type="submit" className={styles.modifeButton}>Modificar</button>
            </div>

            <div className={styles.closesButtonProperties}>
                <button type="button" onClick={onCloseForm}>
                    <Image
                        src="/icons/close.png"
                        alt="Button to close"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </form>
    );
}
