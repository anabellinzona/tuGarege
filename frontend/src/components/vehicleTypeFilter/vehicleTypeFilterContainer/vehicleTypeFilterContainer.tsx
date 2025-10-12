import styles from "./vehicleTypeFilterContainer.module.css";
import VehicleTypeFilter from "@/components/vehicleTypeFilter/vehicleTypeFilter";

type VehicleFilterSectionProps = {
    onFilterChange: (tipo: string) => void;
    selectedFilter: string;
}

export default function VehicleTypeFilterContainer({ onFilterChange, selectedFilter }: VehicleFilterSectionProps){
    const filtros = [
        { filtro: "Auto", image: "/backgrounds/vehicleTypeFilterCar.png" },
        { filtro: "Moto", image: "/backgrounds/vehicleTypeFilterCar.png" },
        { filtro: "Camioneta", image: "/backgrounds/vehicleTypeFilterCar.png" },
    ];

    return (
        <section className={styles.vehicleTypeFilterContainerProperties}>
            {filtros.map((item, index) => (
                <div key={index} onClick={() => onFilterChange(item.filtro)}>
                    <VehicleTypeFilter
                        key={index}
                        filtro={item.filtro}
                        image={item.image}
                        isSelected={selectedFilter === item.filtro}
                    />
                </div>
            ))}
        </section>
    );
}