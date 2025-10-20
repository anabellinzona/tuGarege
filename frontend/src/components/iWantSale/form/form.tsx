import styles from "@/components/iWantSale/form/form.module.css";
import Link from "next/link";

type Prop = {
    title: string,
    message: string,
    camp1: string,
    camp2: string,
    infoButton: string,
    advertationMessage: string,
    whatDo: string
}

export default function FormSale({title, message, camp1, camp2, infoButton, advertationMessage, whatDo}: Prop ){
    return(
        <div className={styles.sectionFormAndInstructions}>
            <div className={styles.infoProperties}>
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
            <form>
                <label>{camp1}</label>
                <input placeholder={camp1}/>

                <label>{camp2}</label>
                <input placeholder={camp2} type="password"/>

                <button type={"submit"}>{infoButton}</button>
                <h6 className={styles.advertationProperties}>{advertationMessage} <Link href={"/"}><span>{whatDo}</span></Link></h6>
            </form>
        </div>
    );
}