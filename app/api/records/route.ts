import { prisma } from "@/lib/prisma";

export async function POST(request : Request) {
    const { text, amount, category, date, userId } = await request.json();
    try{
    const record = await prisma.record.create({
  data: {
    text: text,
    amount: amount,
    category: category,
    date: new Date(date),

    user: {
      connect: {
        id: userId,
      },
    },
  },
});
    return new Response(JSON.stringify(record), { status: 201 });
    }catch(err){
        console.error("Error creating record:", err);
        return new Response("Something went wrong", { status: 500 });
    }
}

export async function DELETE(req :Request) {
  try{
     const {id} = await req.json();
     const user = await prisma.record.delete({
      where : {
        id : id,
      }
    }
    );
    return new Response(JSON.stringify(user), { status: 200 });
  }catch(err)
  {   console.error("Error deleting record:", err);
        return new Response("Something went wrong", { status: 500 });
  }
}