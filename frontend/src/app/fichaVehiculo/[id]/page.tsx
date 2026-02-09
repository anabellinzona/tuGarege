import FileVehicle from "@/components/fileVehicle/fileVehicle";

export default function Page({ params, searchParams }: any) {
    const id = params.id;
    const mode = searchParams.mode || "view";

    if(mode == "create"){
        return <FileVehicle mode={mode} />;
    }

    return <FileVehicle id={id} mode={mode} />;
}
