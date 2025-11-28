import ProfileDescription from "@/components/profileDescription/profileDescription";
import UserContent from "@/components/userContent/userContent";
import {Suspense} from "react";

export default async function Profile() {
    return (
        <main>
            <Suspense>
                <ProfileDescription/>
                <UserContent/>
            </Suspense>
        </main>
    )
}