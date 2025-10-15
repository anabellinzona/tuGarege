import styles from './standardCard.module.css';
import Image from 'next/image';
type Prop = {
    id?: number,
    marca?: string,
    modelo?: string,
    km?: number,
    image: string
}

export default function StandardCard({id, marca, modelo, km, image}: Prop) {
    return (
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
                    <h6 className={styles.km}>{km}km</h6>
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
    );
}