import prisma from "@/app/utils/Connects";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try{
        const { userId } = await auth();
        console.log("User ID:", userId); // Log User ID

        if(!userId){
            return NextResponse.json({error: "Not Authenticated"}, {status: 401});
        }

        const {title, description, date, completed, important} = await req.json();
        console.log("Incoming Task Data:", { title, description, date, completed, important }); // Log incoming data


        if(!title || !description || !date){
            return NextResponse.json({error: "Missing Fields"}, {status: 400});
        }

        if(title.length < 3){
            return NextResponse.json({error: "Title must be least 3 characters"}, {status: 400});
        }

         // Log incoming task data
         console.log("Incoming Task Data:", { title, description, date, completed, important });

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId,
            }
        });
        console.log("Parsed Task Data:", {
            title,
            description,
            date: new Date(date), // Ensure it's a Date object
            completed,
            important,
        });

        console.log("Created Task:", task);        

    return NextResponse.json(task);
    
    }
    catch (error) {
        console.log("Error Creating Task", error);
        return NextResponse.json({error: "Error Creating Task"}, {status: 500});
    }
}
export async function GET (req: Request) {
    try{
    }catch (error) {
        console.log("Error Getting Task", error);
        return NextResponse.json({error: "Error Getting Task"}, {status: 500});
    }
}
export async function PUT (req: Request) {
    try{
    }catch (error) {
        console.log("Error Updating Task", error);
        return NextResponse.json({error: "Error Updating Task"}, {status: 500});
    }
}
export async function DELETE (req: Request) {
    try{
    }catch (error) {
        console.log("Error Deleting Task", error);
        return NextResponse.json({error: "Error Deleting Task"}, {status: 500});
    }
}