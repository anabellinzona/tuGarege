import styles from './postCard.module.css';
import Image from 'next/image';

export default function PostCard() {
    return (
        <main className={styles.main}>
            <div className={styles.imageContainer}>
                <Image
                    src={'/test/camioneta.jpeg'}
                    alt={'vehículo descripto en la publicación'}
                    fill
                    style={{objectFit: "cover"}}
                />
            </div>
        </main>
    )
}