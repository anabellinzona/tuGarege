import styles from './profileDescription.module.css'
import Image from 'next/image';

export default function ProfileDescription() {
    return(
        <main className={styles.main}>
            <div className={styles.content}>
                <div className={styles.profileImage}>
                    <Image
                        src={'/test/hbcamionetas.jpeg'}
                        alt={'user profile image'}
                        fill
                        style={{objectFit: 'cover'}}
                    />
                </div>

                <div className={styles.description}>
                    <h3>Horacio Bidegain Camionetas</h3>

                    <div className={styles.contactPlusPosts}>
                        <div className={styles.contactsWrapper}>
                            <div className={styles.contact}>
                                <Image
                                    src={'/icons/wp.png'}
                                    alt={'WhatsApp icon'}
                                    fill
                                    style={{objectFit: 'cover'}}
                                />
                            </div>
                            <div className={styles.contactRed}>
                                <Image
                                    src={'/icons/phone.png'}
                                    alt={'user profile image'}
                                    width={22}
                                    height={22}
                                />
                            </div>
                        </div>

                        <div className={styles.postsQuantity}>
                            <h5>10 publicaciones</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.moreInfo}>
                <h5>Av. Perón y Montevideo Instragram: @horaciobidegaincamionetas</h5>
            </div>
        </main>
    )
}