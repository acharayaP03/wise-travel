import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/FakeUserContext.jsx';
import PageNavigation from '../../components/Navigation/PageNavigation.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ResuableUI/Button.jsx';

export default function Login() {
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	// // PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) return;
		login(email, password);
	}

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/app', { replace: true });
		}
	}, [isAuthenticated]);

	return (
		<main className={styles.login}>
			<PageNavigation />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input type='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type='submit' buttonType='primary'>
						Login
					</Button>
				</div>
			</form>
		</main>
	);
}
