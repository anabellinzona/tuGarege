import styles from './standardCard.module.css';
import Image from 'next/image';
import Link from "next/link";
type Prop = {
    id?: number,
    marca?: string,
    modelo?: string,
    image: string,
    precio: number
}

export default function StandardCard({id, marca, modelo, image, precio}: Prop) {
    return (
        <Link href={`/fichaVehiculo/${id}`} >
            <main className={styles.main}>
                <div className={styles.imageContainer}>
                    <Image
                        src={image}
                        alt={'vehículo descripto en la publicación'}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className={styles.data}>
                    <div className={styles.details}>
                        <h6>{marca} {modelo}</h6>
                        <h6 className={styles.price}>${precio}</h6>
                    </div>

                    <div>
                        <Image
                            src={'/test/hbcamionetas.jpeg'}
                            alt={'Foto de perfil del usuario'}
                            width={50}
                            height={50}
                        />
                    </div>
                </div>
            </main>
        </Link>
    );
}