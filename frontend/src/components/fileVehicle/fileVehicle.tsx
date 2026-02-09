"use client";
import {useEffect, useState} from "react";
import styles from "./fileVehicle.module.css";
import Carrousel from "@/components/fileVehicle/carrousel/carrousel";
import MainInfo from "@/components/fileVehicle/mainInfo/mainInfo";
import SecondInfo from "@/components/fileVehicle/secondInfo/secondInfo";
import ConsultButton from "@/components/buttons/consultButton/consultButton";
import Recommended from "@/components/recommended/recommended";
import FormEdit from "@/components/fileVehicle/formEdit/formEdit";
import {useSearchParams} from "next/navigation";
import DescriptionInfo from "@/components/fileVehicle/descriptionInfo/descriptionInfo";
import {authService} from "@/service/authService";

type Prop = {
    id?: string;
    mode: 'view' | 'create' | 'edit'
}

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

type CampoAEditar = {
    name: string;
    value: string | number | boolean;
    type: "text" | "number" | "textarea" | "checkbox" | "option";
    label: string;
};

export default function FileVehicle({id, mode}: Prop){
    const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState<string | null>(null);
    const isEmptyFile = mode === "create";
    const isEditableFile = mode === "edit";
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const searchParams = useSearchParams();
    const modeParam = searchParams.get("mode");

    const [camposAEditar, setCamposAEditar] = useState<CampoAEditar[]>([]);
    const [vehiculoAEditar, setVehiculoAEditar] = useState(false);

    const user = authService.getUserData();

    if (!user || user.id == null) {
        alert("Sesión no válida");
        return;
    }

    const emptyVehiculo: Vehiculo = {
        id: 0,
        marca: "",
        modelo: "",
        km: 0,
        precio: 0,
        descripcion: "",
        tipo: "",
        destacado: false,
        estado: "",
        imagenes: [],
        anio: new Date().getFullYear(),
        vendedorId: user.id
    };


    const handleVehiculoUpdated = (nuevoVehiculo: Vehiculo) => {
        setVehiculo(nuevoVehiculo);
    };

    useEffect(() => {
        if (mode === "create" && vehiculo) {
            setCamposAEditar([
                { name: "marca", label: "Marca", value: "Marca", type: "text" },
                { name: "modelo", label: "Modelo", value: "Modelo", type: "text" },
                { name: "km", label: "Kilómetros", value: 0, type: "number" },
                { name: "anio", label: "Año", value: new Date().getFullYear(), type: "number" },
                { name: "precio", label: "Precio", value: 0, type: "number" },
                { name: "estado", label: "Estado", value: "Usado", type: "option" },
                { name: "tipo", label: "Tipo vehículo", value: "Tipo", type: "option" },
                { name: "descripcion", label: "Descripción", value: "Descripción", type: "textarea" },
            ]);
        }
    }, [mode, vehiculo]);


    useEffect(() => {
        if (mode === "create") {
            setVehiculo(emptyVehiculo);
            setVehiculoAEditar(true);
            setLoading(false);
            return;
        }

        fetch(`${API_URL}/api/vehiculos/${id}`)
            .then((response) =>{
                if(!response.ok){
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => {
                setVehiculo(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("El error fue: " + error);
                setLoading(false);
            });
    }, [id, modeParam]);

    if(loading) return <div>Cargando...</div>;

    if(mode !== "create" && (!vehiculo?.imagenes || vehiculo.imagenes.length === 0)) {
        return <p>No hay imágenes disponibles</p>;
    }

    if(!vehiculo) return <div>No se encontró el vehículo</div>;

    const handleSaveField = (fieldName: keyof Vehiculo, value: string | number) => {
        setVehiculo(prev => prev ? { ...prev, [fieldName]: value } : null);
        setEditingField(null);
    };

    return(
        <section className={styles.vehicleFileSectionContainerProperties}>
            <div className={styles.carrouselAndVehicleInformationProperties}>
                {isEditableFile && (
                    <Carrousel imagenes={vehiculo.imagenes}/>
                ) || isEmptyFile && (
                    <Carrousel imagenes={emptyVehiculo.imagenes}/>
                )}
                <MainInfo
                    vehiculo={vehiculo}
                    isEditable={isEditableFile}
                    editingField={editingField}
                    onEditClick={() => {
                        setCamposAEditar([
                            { name: "marca", label: "Marca", value: vehiculo?.marca, type: "text" },
                            { name: "modelo", label: "Modelo", value: vehiculo?.modelo, type: "text" },
                            { name: "km", label: "Kilómetros", value: vehiculo?.km, type: "number" },
                            { name: "anio", label: "Año", value: vehiculo?.anio, type: "number" },
                            { name: "precio", label: "Precio", value: vehiculo?.precio, type: "number" },
                        ]);
                        setVehiculoAEditar(true);
                    }}
                    onSaveField={handleSaveField}
                    classname={styles.inputProperties}
                />
            </div>
            <div className={styles.secondContainerProperties}>
                <div className={styles.secondInfoContainerProperties}>
                    <div>
                        <SecondInfo
                            vehiculo={vehiculo}
                            isEditable={isEditableFile}
                            editingField={editingField}
                            onEditClick={() => {
                                setCamposAEditar([
                                    { name: "modelo", label: "Modelo", value: vehiculo?.modelo, type: "text" },
                                    { name: "km", label: "Kilómetros", value: vehiculo?.km, type: "number" },
                                    { name: "estado", label: "Estado", value: vehiculo?.estado, type: "option" },
                                ]);
                                setVehiculoAEditar(true); // abre el formulario
                            }}
                            onSaveField={handleSaveField}
                            classname={styles.inputProperties}/>
                    </div>
                    <div className={styles.descriptionContainerProperties}>
                        <div className={styles.titleAndEditButtonProperties}>
                            <h3>Descripción</h3>
                        </div>
                        <div>
                            <DescriptionInfo
                                vehiculo={vehiculo}
                                isEditable={isEditableFile}
                                editingField={editingField}
                                onEditClick={() => {
                                    setCamposAEditar([
                                        {
                                            name: "descripcion",
                                            label: "Descripción",
                                            value: vehiculo?.descripcion,
                                            type: "textarea"
                                        }
                                    ])
                                    setVehiculoAEditar(true);
                                }}
                                onSaveField={handleSaveField}
                                classname={styles.inputProperties}/>
                        </div>
                    </div>
                    <div className={styles.buttonContainerProperties}>
                        <ConsultButton message={"Consultar por este vehículo"}/>
                    </div>
                </div>
                <div className={styles.recommendedContainerProperties}>
                    <Recommended vehicleId={vehiculo.id} />
                </div>
            </div>
            <div className={styles.formProperties}>
                {vehiculoAEditar && isEditableFile && (
                    <FormEdit
                        campos={camposAEditar}
                        idV={vehiculo.id}
                        mode={'edit'}
                        onCloseForm={() => setVehiculoAEditar(false)}
                        onVehiculoUpdated={handleVehiculoUpdated}
                    />
                ) || isEmptyFile && (
                    <FormEdit
                        campos={camposAEditar}
                        mode={'create'}
                        onCloseForm={() => setVehiculoAEditar(false)}
                        onVehiculoUpdated={handleVehiculoUpdated}
                    />
                )}
            </div>
        </section>
    );
}