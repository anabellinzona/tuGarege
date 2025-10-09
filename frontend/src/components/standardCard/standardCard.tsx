import styles from './standardCard.module.css';
import Image from 'next/image';

export default function StandardCard() {
    return (
        <main className={styles.main}>
            <div className={styles.imageContainer}>
                <Image
                    src={'/test/camioneta.jpeg'}
                    alt={'vehículo descripto en la publicación'}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            <div className={styles.data}>
                <div className={styles.details}>
                    <h6>Toyota Hilux SRX Aut. 2023</h6>
                    <h6 className={styles.km}>29.000 km</h6>
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
