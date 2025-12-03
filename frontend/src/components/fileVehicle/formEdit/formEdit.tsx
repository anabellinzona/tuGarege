type Prop = {
    marca: string,
    modelo: string,
    km: number,
    anio: number
}

export default function FormEdit({marca, modelo, km, anio} : Prop){
    return(
        <form>
            <label>Marca</label>
            <input placeholder={marca} type={"text"}/>

            <label>Modelo</label>
            <input placeholder={modelo} type={"text"}/>

            <label>Kilometros</label>
            <input placeholder={km.toString()} type={"number"}/>

            <label>Año</label>
            <input placeholder={anio.toString()} type={"number"}/>

            <button type={"submit"}>Modificar</button>
        </form>
    );
}