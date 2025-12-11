"use client";
import {useEffect, useState} from "react";
import styles from "./fileVehicle.module.css";
import Carrousel from "@/components/fileVehicle/carrousel/carrousel";
import MainInfo from "@/components/fileVehicle/mainInfo/mainInfo";
import SecondInfo from "@/components/fileVehicle/secondInfo/secondInfo";
import ItemCharacteristic from "@/components/fileVehicle/itemCharacteristic/itemCharacteristic";
import ConsultButton from "@/components/buttons/consultButton/consultButton";
import Recommended from "@/components/recommended/recommended";
import EditableText from "@/components/fileVehicle/editableText/editableText";
import EditButton from "@/components/fileVehicle/editButton/editButton";
import FormEdit from "@/components/fileVehicle/formEdit/formEdit";

type Prop = {
    id: string;
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
    type: "text" | "number" | "textarea" | "checkbox";
    label: string;
};

export default function FileVehicle({id, mode}: Prop){
    const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState<string | null>(null);
    const isEmptyFile = mode === "create";
    const isEditableFile = mode === "edit";
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // const [camposAEditar, setCamposAEditar] = useState<Vehiculo | null>(null);

    console.log("hola")

    const initialVehicle: Vehiculo = vehiculo || {
        id: 0,
        vendedorId: 0,
        imagenes: [],
        marca: '',
        modelo: '',
        km: 0,
        precio: 0,
        descripcion: '',
        tipo: '',
        estado: '',
        anio: 0
    };

    const [localVehicle, setLocalVehicle] = useState<Vehiculo>(initialVehicle);

    const [camposAEditar, setCamposAEditar] = useState<CampoAEditar[]>([]);
    const [vehiculoAEditar, setVehiculoAEditar] = useState(false);

// función que se llamará desde los hijos
    const handleOpenDynamicEdit = (fields: CampoAEditar[]) => {
        setCamposAEditar(fields);
        setVehiculoAEditar(true);
    };

    useEffect(() => {
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
    }, [id]);

    if(loading) return <div>Cargando...</div>;
    if(!vehiculo) return <div>No se encontró el vehículo</div>;
    if(!vehiculo.imagenes || vehiculo.imagenes.length === 0) {
        return <p>No hay imágenes disponibles</p>;
    }

    const handleSaveAddress = async (value: string) => {
        console.log(`Guardando address:`, value);
        setVehiculo(prev => prev ? { ...prev, descripcion: value } : null);
        setEditingField(null);
    };

// ✅ Tipar correctamente el array
//     const camposAEditar: Array<{
//         name: string;
//         value: string | number | boolean;
//         type: 'text' | 'number' | 'textarea' | 'checkbox';
//         label: string;
//     }> = [
//         { name: 'marca', value: vehiculo.marca, type: 'text', label: 'Marca' },
//         { name: 'modelo', value: vehiculo.modelo, type: 'text', label: 'Modelo' },
//         { name: 'km', value: vehiculo.km, type: 'number', label: 'Kilómetros' },
//         { name: 'anio', value: vehiculo.anio, type: 'number', label: 'Año' },
//         { name: 'precio', value: vehiculo.precio, type: 'number', label: 'Precio' }
//     ];

    const handleCancelEdit = () => {
        console.log(`Cancelando edición`);
        setEditingField(null);
    };

    const handleStartEdit = (fieldName: keyof Vehiculo) => {
        setEditingField(fieldName);
    };

    const handleSaveField = (fieldName: keyof Vehiculo, value: string | number) => {
        setVehiculo(prev => prev ? { ...prev, [fieldName]: value } : null);
        setEditingField(null);
    };

    const handleStartEditHeader = () => setEditingField('descripcion');


    // 2. Función para abrir el formulario
    const handleOpenEdit = () => {
        // Al hacer clic en Editar, cargamos los datos
        setVehiculoAEditar(true);
    };

    // 3. Función para cerrar el formulario (resetear el estado)
    const handleCloseEdit = () => {
        setVehiculoAEditar(false);
    };

    return(
        <section className={styles.vehicleFileSectionContainerProperties}>
            <div className={styles.carrouselAndVehicleInformationProperties}>
                <Carrousel imagenes={vehiculo.imagenes}/>
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
                            { name: "precio", label: "Precio", value: vehiculo?.precio, type: "number" }
                        ]);
                        setVehiculoAEditar(true); // abre el formulario
                    }}
                    onSaveField={handleSaveField}
                    classname={styles.inputProperties}
                />


            </div>
            <div className={styles.secondContainerProperties}>
                <div className={styles.secondInfoContainerProperties}>
                    <div>
                        <SecondInfo vehiculo={vehiculo}
                                    isEditable={isEditableFile}
                                    editingField={editingField}
                                    onStartEdit={handleStartEdit}
                                    onCancelEdit={handleCancelEdit}
                                    onSaveField={handleSaveField}
                                    classname={styles.inputProperties}/>
                    </div>
                    <div className={styles.aditionalInfoContainerProperties}>
                        <h3>Datos adicionales</h3>
                        <ItemCharacteristic id={vehiculo.id}/>
                    </div>
                    <div className={styles.descriptionContainerProperties}>
                        <div className={styles.titleAndEditButtonProperties}>
                            <h3>Descripción</h3>
                            <EditButton
                                onStartEdit={() => handleStartEditHeader()}
                                onEndEdit={() => handleSaveAddress(localVehicle.descripcion)}
                                isEditing={editingField === 'descripcion'}
                                className={styles.editButtonProperties}
                                show={isEditableFile || isEmptyFile}
                                img={'/icons/editIcon.png'}
                            />
                        </div>
                        {(isEmptyFile || isEditableFile) && editingField === 'descripcion' ? (
                            <EditableText
                                value={vehiculo.descripcion}
                                isEditing={true}
                                type={"text"}
                                onSave={(value) => handleSaveAddress(value)}
                                onCancel={handleCancelEdit}
                                className={styles.inputProperties}
                            />
                        ) : (
                            <div onClick={() => handleStartEditHeader()} style={{ cursor: 'pointer' }}>
                                {vehiculo.descripcion}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.recommendedContainerProperties}>
                    <Recommended vehicleId={vehiculo.id} />
                </div>
            </div>
            <div className={styles.buttonContainerProperties}>
                <ConsultButton message={"Consultar por este vehículo"}/>
            </div>

            <div className={styles.formProperties}>
                {vehiculoAEditar && (
                    <FormEdit campos={camposAEditar} idV={vehiculo.id} onCloseForm={() => setVehiculoAEditar(false)}  />
                )}
            </div>
        </section>
    );
}