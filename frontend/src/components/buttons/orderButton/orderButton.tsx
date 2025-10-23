import styles from './orderButton.module.css';

export default function OrderButton() {
    return(
        <main>
            <button className={styles.button}>
                <h5>Ordenar por</h5>
            </button>
        </main>
    )
}