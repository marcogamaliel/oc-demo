import './login.view.scss';
import { useNavigate } from "react-router-dom";
import { Credential } from "../../domain/models/credential.model";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

export function LoginView() {
    const navigate = useNavigate();
    const onSubmit = (credential: Credential) => {
        console.log('login', credential)
        UsersRepository.login(credential).then(() => {
            navigate('/');
        }).catch((error) => {
            alert(error)
        })
    }
    const { control, register, handleSubmit, formState: { errors } } = useForm<Credential>({defaultValues: {email: '', password: ''}});

    return (
        <div className="login">
            <div className="login__container">
                <img data-testid="sis-logo" alt="sodimac-logo" src="https://images.falabella.com/v3/assets/blt34d59f5b52e53f95/blte406c5291b17be06/63a3e08766600623830ace19/logo-sodimac.svg" />
                <h1>Sistema de ventas</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Correo" variant='standard' fullWidth sx={{ color: 'white' }}/>}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Password" variant='standard' type="password" fullWidth />}
                    />
                    <Button variant="contained" type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}