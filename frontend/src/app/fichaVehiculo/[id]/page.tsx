import FileVehicle from "@/components/fileVehicle/fileVehicle";

export default async function Page({ params, searchParams }: any) {
    const { id } = await params;
    const { mode: modeParam } = await searchParams;
    const mode = modeParam || "view";

    if(mode == "create"){
        return <FileVehicle mode={mode} />;
    }

    return <FileVehicle id={id} mode={mode} />;
}
