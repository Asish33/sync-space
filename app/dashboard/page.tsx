"use client";
import { User } from "@/lib/user";
import { useSignOut } from "@/lib/sign-out";
export default function Dashboard(){
    const signOut = useSignOut();
    const session = User();
    return <div>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard</p>
        <p>You are logged in as {session?.user?.email}</p>
        <p>You are logged in as {session?.user?.name}</p>
        <p>You are logged in as {session?.user?.image}</p>
        <p>You are logged in as {session?.user?.id}</p>
        <button onClick = {signOut}>signOut</button>
    </div>
}