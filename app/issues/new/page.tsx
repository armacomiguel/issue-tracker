'use client';
import React from 'react';
import { TextField, TextArea, Button } from '@radix-ui/themes'; 

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder="Titulo">
        </TextField.Root>
        <TextArea placeholder="Descripción" />
        <Button>Crear Nuevo Detalle</Button>
    </div>
  )
}

export default NewIssuePage