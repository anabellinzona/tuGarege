import { Suspense } from 'react';
import VehiclesContent from '@/components/vehicleContent/vehicleContent'; // Asegúrate de que la ruta de importación sea correcta

// Componente de servidor que envuelve el componente de cliente
export default function Page() {
    return (
        <Suspense fallback={<div>Cargando filtros de URL...</div>}>
            <VehiclesContent />
        </Suspense>
    );
}