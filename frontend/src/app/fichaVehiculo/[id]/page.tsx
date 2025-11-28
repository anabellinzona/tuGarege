import FileVehicle from "@/src/components/fileVehicle/fileVehicle";

export default async function Page({ params }: any) {
    const { id } = await params;
    return(
        <FileVehicle id={id} mode={"edit"}/>
    );
}