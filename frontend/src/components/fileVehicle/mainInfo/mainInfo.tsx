import styles from "@/components/fileVehicle/mainInfo/mainInfo.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConsultButton from "@/components/buttons/consultButton/consultButton";
import EditableText from "@/components/fileVehicle/editableText/editableText";
import EditButton from "@/components/fileVehicle/editButton/editButton";
import EditableNumeric from "@/components/fileVehicle/editableNumeric/editableNumeric";

interface Imagen {
    id: number;
    url: string;
}

interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    km: number;
    precio: number;
    moneda?: string;
    descripcion: string;
    tipo: string;
    fechaPublicacion?: string;
    destacado?: boolean;
    estado: string;
    imagenes: Imagen[];
    logoMarca?: string;
    anio: number;
    vendedorId: number;
}

type Prop = {
    vehiculo: Vehiculo | null;
    isEditable: boolean;
    editingField: string | null;
    onStartEdit: (field: keyof Vehiculo) => void;
    onCancelEdit: () => void;
    onSaveField: (field: keyof Vehiculo, value: string | number) => void;
    classname: string;
};

interface Vendedor {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    contrasena: string;
    instagram: string;
    descripcion: string;
    fotoPerfil: string;
    ciudad: string;
}

export default function MainInfo({
                                     vehiculo,
                                     isEditable,
                                     onCancelEdit,
                                     onStartEdit,
                                     editingField,
                                     onSaveField,
                                     classname
                                 }: Prop) {
    const [vendedor, setVendedor] = useState<Vendedor>();

    useEffect(() => {
        if (!vehiculo?.vendedorId) return;
        fetch(`http://localhost:8080/api/vendedores/${vehiculo.vendedorId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar el vendedor");
                }
                return response.json();
            })
            .then(data => setVendedor(data))
            .catch(error => console.log("El error fue: " + error));
    }, [vehiculo?.vendedorId]);

    if (!vehiculo) return null;

    return (
        <div className={styles.vehicleInformationProperties}>
            <div className={styles.vehicleMainInfortationProperties}>
                <div className={styles.editableField}>
                    {editingField === "marca" ? (
                        <EditableText
                            value={vehiculo.marca}
                            isEditing={true}
                            onSave={(value) => onSaveField("marca", value)}
                            onCancel={onCancelEdit}
                            className={classname}
                        />
                    ) : (
                        <h1 onClick={() => onStartEdit("marca")}>{vehiculo.marca}</h1>
                    )}
                    {isEditable && (
                        <EditButton
                            onStartEdit={() => onStartEdit("marca")}
                            show={true}
                            isEditing={editingField === "marca"}
                            onEndEdit={onCancelEdit}
                            img={"/icons/editIcon.png"}
                        />
                    )}

                    {editingField === "modelo" ? (
                        <EditableText
                            value={vehiculo.modelo}
                            isEditing={true}
                            onSave={(value) => onSaveField("modelo", value)}
                            onCancel={onCancelEdit}
                            className={classname}
                        />
                    ) : (
                        <h1 onClick={() => onStartEdit("modelo")}>{vehiculo.modelo}</h1>
                    )}
                    {isEditable && (
                        <EditButton
                            onStartEdit={() => onStartEdit("modelo")}
                            show={true}
                            isEditing={editingField === "modelo"}
                            onEndEdit={onCancelEdit}
                            img={"/icons/editIcon.png"}
                        />
                    )}
                </div>

                {/* Kilómetros */}
                <div className={styles.editableField}>
                    {editingField === "km" ? (
                        <EditableNumeric
                            value={vehiculo.km}
                            isEditing={true}
                            onSave={(value) => onSaveField("km", value)}
                            onCancel={onCancelEdit}
                            className={classname}
                        />
                    ) : (
                        <p onClick={() => onStartEdit("km")}>{vehiculo.km} km</p>
                    )}
                    {isEditable && (
                        <EditButton
                            onStartEdit={() => onStartEdit("km")}
                            show={true}
                            isEditing={editingField === "km"}
                            onEndEdit={onCancelEdit}
                            img={"/icons/editIcon.png"}
                        />
                    )}
                </div>
            </div>

            {/* Precio */}
            <div className={styles.priceInformationProperties}>
                <div className={styles.editableField}>
                    <h1>Precio</h1>
                    {isEditable && (
                        <EditButton
                            onStartEdit={() => onStartEdit("precio")}
                            show={true}
                            isEditing={editingField === "precio"}
                            onEndEdit={onCancelEdit}
                            img={"/icons/editIcon.png"}
                        />
                    )}
                </div>
                {editingField === "precio" ? (
                    <EditableNumeric
                        value={vehiculo.precio}
                        isEditing={true}
                        onSave={(value) => onSaveField("precio", value)}
                        onCancel={onCancelEdit}
                        className={classname}
                    />
                ) : (
                    <span onClick={() => onStartEdit("precio")}>${vehiculo.precio}</span>
                )}
            </div>

            {/* Vendedor */}
            <div className={styles.sallerInformationProperties}>
                <h1>Vendedor</h1>
                <Link href={`/perfil/${vendedor?.id}`}>
                    <span>{vendedor?.nombre}</span>
                </Link>
            </div>

            <Link href={`https://wa.me/${vendedor?.telefono}`}>
                <ConsultButton message={"Consultar"} />
            </Link>
        </div>
    );
}
