import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AUTH_TOKEN } from '../constants';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../gql/mutations';
import { useMutation } from '@apollo/client';

const Login = () => {
	const router = useRouter();
	const authToken = global.localStorage?.getItem(AUTH_TOKEN);
	const [formState, setFormState] = useState({
		login: true,
		email: '',
		password: '',
		name: '',
	});

	const [login] = useMutation(LOGIN_MUTATION, {
		variables: {
			email: formState.email,
			password: formState.password,
		},
		onCompleted: ({ login }) => {
			global.localStorage.setItem(AUTH_TOKEN, login.token);
			router.push('/');
		},
	});

	const [signup] = useMutation(SIGNUP_MUTATION, {
		variables: {
			name: formState.name,
			email: formState.email,
			password: formState.password,
		},
		onCompleted: ({ signup }) => {
			global.localStorage.setItem(AUTH_TOKEN, signup.token);
			router.push('/');
		},
	});

	return (
		<div>
			<h4 className='mv3'>{formState.login ? 'Login' : 'Sign Up'}</h4>
			<div className='flex flex-column'>
				{!formState.login && (
					<input
						value={formState.name}
						onChange={(e) =>
							setFormState({
								...formState,
								name: e.target.value,
							})
						}
						type='text'
						placeholder='Your name'
					/>
				)}
				<input
					value={formState.email}
					onChange={(e) =>
						setFormState({
							...formState,
							email: e.target.value,
						})
					}
					type='text'
					placeholder='Your email address'
				/>
				<input
					value={formState.password}
					onChange={(e) =>
						setFormState({
							...formState,
							password: e.target.value,
						})
					}
					type='password'
					placeholder='Choose a safe password'
				/>
			</div>
			<div className='flex mt3'>
				<button
					className='pointer mr2 button'
					onClick={formState.login ? login : signup}
				>
					{formState.login ? 'login' : 'create account'}
				</button>
				<button
					className='pointer button'
					onClick={(e) =>
						setFormState({
							...formState,
							login: !formState.login,
						})
					}
				>
					{formState.login
						? 'need to create an account?'
						: 'already have an account?'}
				</button>
			</div>
		</div>
	);
};

export default Login;
