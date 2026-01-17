
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import { AuthForm } from "../../components/AuthForm";

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect('/dashboard');
    }
    return <AuthForm />
}
