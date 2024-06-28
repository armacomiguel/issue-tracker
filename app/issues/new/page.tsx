'use client';
import React, { useState } from 'react';
import { TextField, Button, Callout, Text } from '@radix-ui/themes'; 
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import {useRouter} from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

  return (
    <div>
        {error && (
            <Callout.Root color="red" className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
        )}

        <form className='space-y-3' onSubmit={handleSubmit(async(data) => {
           try {
                setSubmitting(true);
                await axios.post('/api/issues',data);
                router.push('/issues');
           } catch (error) {
            setSubmitting(false);
            setError('¡Algo salío mal.!');
           }
        })}>
            <TextField.Root placeholder="Titulo" {...register('title')}>
            </TextField.Root>
            {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
            <Controller 
                name="description"
                control={control}
                render={({field}) => <SimpleMDE placeholder="Descripción" {...field} />}
            />
            { <ErrorMessage>{errors.description?.message}</ErrorMessage>}
            <Button disabled={submitting}>Crear Nuevo Detalle {submitting && <Spinner/ >} </Button>
        </form>
    </div>
  )
}

export default NewIssuePage