import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
    title: z.string().min(1, 'Titulo es obligatorio.').max(255),
    description: z.string().min(1, 'Descripción es obligatorio.')
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 404});

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    });

    // status obj created
    return NextResponse.json(newIssue, {status: 201});
}