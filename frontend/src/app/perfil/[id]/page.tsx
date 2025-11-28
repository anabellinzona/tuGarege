import ProfileDescription from "@/src/components/profileDescription/profileDescription";
import UserContent from "@/src/components/userContent/userContent";
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