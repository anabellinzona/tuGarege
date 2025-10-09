import styles from './Footer.module.css';
import SellButton from "@/components/buttons/sellButton/SellButton";
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.main}>
            <div className={styles.filters}>
                <div>
                    <h4>Marcas</h4>

                    <h6>Toyota</h6>
                    <h6>Ford</h6>
                    <h6>Chevrolet</h6>
                    <h6>Fiat</h6>
                    <h6>Dodge</h6>
                    <h6>Renault</h6>
                    <h6>Volkswagen</h6>
                    <h6>Mitsubishi</h6>
                    <h6>Volvo</h6>
                    <h6>Peugeot</h6>
                    <h6>Todas las marcas</h6>
                </div>

                <div>
                    <h4>Modelo</h4>

                    <h6>2025</h6>
                    <h6>2024</h6>
                    <h6>2023</h6>
                    <h6>2022</h6>
                    <h6>2021</h6>
                    <h6>2020</h6>
                    <h6>2019</h6>
                    <h6>2018</h6>
                    <h6>2017</h6>
                    <h6>2016</h6>
                    <h6>Todas las marcas</h6>
                </div>

                <div>
                    <h4>Carrocería</h4>

                    <h6>Auto</h6>
                    <h6>Camioneta</h6>
                    <h6>Suv</h6>
                    <h6>Camión</h6>
                    <h6>Cuatriciclos</h6>
                    <h6>Todas las carrocerías</h6>
                </div>

                <div>
                    <h4>Estado</h4>

                    <h6>Nuevo</h6>
                    <h6>Usado</h6>
                    <h6>Todos los estados</h6>
                </div>
            </div>

            <div className={styles.button}>
                <SellButton/>
            </div>

            <div>
                <Image
                    src={'/logo/vertical.png'}
                    alt={'Logo TuGarage vertical'}
                    width={266}
                    height={180}
                />
            </div>
        </footer>
    )
}