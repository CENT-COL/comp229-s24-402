import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {
    const [form, setForm] = useState({
        email:'',
        password:''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || '/api';

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();
            localStorage.setItem('token', JSON.stringify(data.token));
            //Todo Implement on the backend the return of the username;
            // localStorage.setItem('username', JSON.stringify(data.username));

            setUser({token: data.token});

            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <></>
    )
}

export default Login;