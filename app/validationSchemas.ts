import {z} from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Titulo es obligatorio.').max(255),
    description: z.string().min(1, 'Descripción es obligatorio.')
});