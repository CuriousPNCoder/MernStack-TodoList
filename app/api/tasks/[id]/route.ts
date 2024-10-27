import prisma from "@/app/utils/Connects";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();
        const { id } = params;
        if (!userId) {
            return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
        }
        const task = await prisma.task.delete({
            where: {
                id,
            }
        })
        console.log("Deleted Task:", task);
        return NextResponse.json(task);
    } catch (error) {
        console.log("Error Deleting Task", error);
        return NextResponse.json({ error: "Error Deleting Task" }, { status: 500 });
    }
}