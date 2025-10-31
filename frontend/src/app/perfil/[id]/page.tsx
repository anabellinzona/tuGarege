import ProfileDescription from "@/components/profileDescription/profileDescription";
import UserContent from "@/components/userContent/userContent";

export default async function Profile() {
    return (
        <main>
            <ProfileDescription/>
            <UserContent/>
        </main>
    )
}