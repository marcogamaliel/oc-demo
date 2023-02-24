import './login.view.scss';
import { useNavigate } from "react-router-dom";
import { Credential } from "../../domain/models/credential.model";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';

export function LoginView() {
    const [errorMsg, setErrorMsg] = useState<string|undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<Credential>({defaultValues: {email: '', password: ''}});
    const navigate = useNavigate();
    const onSubmit = (credential: Credential) => {
        setIsLoading(true);
        UsersRepository.login(credential).then(() => {
            navigate('/');
        }).catch((error) => {
            setErrorMsg(error.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }


    return (
        <div className="login">
            <div className="login__container">
                <img data-testid="sis-logo" alt="sodimac-logo" src="https://images.falabella.com/v3/assets/blt34d59f5b52e53f95/blte406c5291b17be06/63a3e08766600623830ace19/logo-sodimac.svg" />
                <h1>Sistema de ventas</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Correo" variant='standard' fullWidth sx={{ color: 'white' }} error={!!errors.email} helperText={errors.email?.message}/>}
                        rules={{ required: 'El correo es requerido' }}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Password" variant='standard' type="password" fullWidth  error={!!errors.password} helperText={errors.password?.message}/>}
                        rules={{ required: 'La contraseña es requerida' }}
                    />
                    {isLoading && <CircularProgress />}
                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    <Button variant="contained" type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}