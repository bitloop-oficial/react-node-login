import axios from 'axios';
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:3000/login',
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }            
            );

            console.log(response.data);
            setUser(response.data);

        } catch (error) {
            if (!error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status == 401) {
                setError('Usuário ou senha inválidos');
            }
        }

    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
        setError('');
    };

    return (
      <div className="login-form-wrap">
        {user == null ? (
            <div>
                <h2>Login</h2>
                <form className='login-form'>
                <input type="email" 
                        name="email" 
                        placeholder="Email" 
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        />
                <input type="password" 
                        name="password" 
                        placeholder="Password" 
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" 
                        className='btn-login'
                        onClick={(e) => handleLogin(e)}>Login</button>
                </form>
                <p>{error}</p>
            </div>
        ) : (
            <div>
                <h2>Olá, {user.name}</h2>
                <button type="button" 
                        className='btn-login'
                        onClick={(e) => handleLogout(e)}>Logout</button> 
            </div>
        )}
      </div>
    );
  }

  export default Login;