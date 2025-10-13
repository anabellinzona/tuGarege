import styles from './SellButton.module.css';
import Link from "next/link";

type Prop = {
    nameButton: string;
    link: string;
}
export default function SellButton({nameButton, link}: Prop) {
    return (
        <Link href={link} >
            <button className={styles.button}>
                <h5>{nameButton}</h5>
            </button>
        </Link>
    )
}