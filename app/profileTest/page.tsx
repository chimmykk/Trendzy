import Loading from "../userProfile/loading";
import ProfilePage from "../userProfile/page";
import { Suspense } from "react";

export default function ProfileTest() {
    return(
        <main>
            <h1>Hello world this is testing</h1>
        <Suspense fallback={<Loading />}>
            <ProfilePage />
        </Suspense>
        </main>
    )
}