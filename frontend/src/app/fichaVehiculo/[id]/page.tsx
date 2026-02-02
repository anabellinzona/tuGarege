import FileVehicle from "@/components/fileVehicle/fileVehicle";

export default function Page({ params, searchParams }: any) {
    const id = params.id;
    const mode = searchParams.mode || "view"; // 👈 default

    return <FileVehicle id={id} mode={mode} />;
}
