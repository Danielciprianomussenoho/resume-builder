import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validEmail } from '../../utils/helper';
import { UserContext } from '../../contexts/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({setCurrentPage}) => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState(null);
  const{ updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validEmail(email)) {
      setError('Prease enter a valid email address.');
      return;
    }

    if(!password) {
      setError('Please enter your password.');
      return;
    }

    setError("");
    
    // API call:
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { 
        email, 
        password ,
      });

      const {token} = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      }else {
       setError('Sometihing went wrong. Please try again.');
    }
  };
  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your credentials to login.</p>

      <form onSubmit={handleLogin}>

          <Input
              type='text'
              placeholder='cipriano@example.com'
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label='Email Address'
          />

          <Input
              type='password'
              placeholder='Min 8 characters'
              value={password}
              onChange={({target}) => setPassword(target.value)}
              label='Password'
          />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>LOGIN</button>
        <p className='text-[13px] text-slate-800 mt-3'>Don't have an account? {" "} 
          <button 
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => {
              setCurrentPage('signup');
            }}
            >
              SignUp
            </button>
        </p>
      </form>
    </div>
  )
}

export default Login  //44min