import styles from "../consultButton/consultButton.module.css";

type Prop = {
    message: string;
}

export default function ConsultButton({message}: Prop){
    return(
        <button className={styles.askButtonProperties}>{message}</button>
    );
}