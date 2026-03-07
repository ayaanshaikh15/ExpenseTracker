import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'
 
export async function GET(_req: NextRequest, ctx: RouteContext<'/expense/[id]'>) {
  const { id } = await ctx.params

 try {
    const records = await prisma.record.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        date: "desc",
      },
    });

    return Response.json(records,{status:200});
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

