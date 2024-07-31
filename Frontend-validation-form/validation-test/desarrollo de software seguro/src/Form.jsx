import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './index.css';

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios.post('http://localhost:3000/add-user', data).then(response => {
            alert('Usuario agregado exitosamente');
        }).catch(error => {
            alert('Error al agregar usuario');
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombres</label>
                <input type="text" {...register('nombres', {
                    required: 'Campo vacío.',
                    pattern: {
                        value: /^[A-Za-z]+$/,
                        message: 'Solo se permiten letras.'
                    }
                })} />
                {errors.nombres && <span>{errors.nombres.message}</span>}
            </div>
            <div>
                <label>Apellidos</label>
                <input type="text" {...register('apellidos', {
                    required: 'Campo vacío.',
                    pattern: {
                        value: /^[A-Za-z]+$/,
                        message: 'Solo se permiten letras.'
                    }
                })} />
                {errors.apellidos && <span>{errors.apellidos.message}</span>}
            </div>
            <div>
                <label>Cédula/RUC</label>
                <input type="text" {...register('cedula_ruc', {
                    required: 'Campo vacío.',
                    pattern: {
                        value: /^[0-9]+$/,
                        message: 'Solo se permiten números.'
                    },
                    validate: {
                        length: value => (value.length === 10 || value.length === 13) || 'Debe tener 10 caracteres (Cédula) o 13 caracteres (RUC).'
                    }
                })} />
                {errors.cedula_ruc && <span>{errors.cedula_ruc.message}</span>}
            </div>
            <div>
                <label>Teléfono</label>
                <input type="text" {...register('telefono', {
                    required: 'Campo vacío.',
                    pattern: {
                        value: /^[0-9]+$/,
                        message: 'Solo se permiten números.'
                    },
                    validate: {
                        length: value => value.length === 10 || 'Debe tener 10 caracteres.'
                    }
                })} />
                {errors.telefono && <span>{errors.telefono.message}</span>}
            </div>
            <div>
                <label>Fecha de Nacimiento</label>
                <input type="date" {...register('fecha_de_nacimiento', {
                    required: 'Campo vacío.',
                    pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message: 'Formato de fecha inválido (YYYY-MM-DD).'
                    },
                    validate: {
                        range: value => {
                            const minDate = new Date('1900-01-01');
                            const maxDate = new Date();
                            const inputDate = new Date(value);
                            return (inputDate >= minDate && inputDate <= maxDate) || 'Fecha fuera de rango.';
                        }
                    }
                })} />
                {errors.fecha_de_nacimiento && <span>{errors.fecha_de_nacimiento.message}</span>}
            </div>
            <div>
                <label>Salario</label>
                <input type="number" {...register('salario', {
                    required: 'Campo vacío.',
                    min: {
                        value: 460,
                        message: `El salario debe ser al menos 460.`
                    }
                })} />
                {errors.salario && <span>{errors.salario.message}</span>}
            </div>
            <div>
                <label>Email</label>
                <input type="email" {...register('email', {
                    required: 'Campo vacío.',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Correo inválido.'
                    }
                })} />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" {...register('password', {
                    required: 'Campo vacío.',
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,12}$/,
                        message: 'Debe tener entre 6 y 12 caracteres, incluir mayúsculas, números y al menos un carácter especial.'
                    }
                })} />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button type="submit">Agregar Usuario</button>
        </form>
    );
};

export default Form;
