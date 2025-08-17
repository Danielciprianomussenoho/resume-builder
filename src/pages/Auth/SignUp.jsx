import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../contexts/userContext';
import { useContext } from 'react';
import uploadImage from '../../utils/uploadImage';


const SignUp = ({setCurrentPage}) => {
  const[profilePic, setProfilePic] = useState(null);
  const[fullName, setFullName] = useState('');
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState('');
  const[error, setError] = useState(null);

  const{ updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError('Please enter full name.');
      return;
    }

    if (!validEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setError('');

    // API call:
    try {
      // upload image if exists
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name : fullName,
        email,
        password,
        profileImageUrl,
      });

      const {token} = response.data;

      if (token) {
        localStorage.setItem('token', token);
        // Update user context or state here if needed
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to create an account. Please try again.');
      }
    }
  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create an account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>

      <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image = {profilePic}  setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
            <Input
                type='text'
                placeholder='Daniel Cipriano...'
                value={fullName}
                onChange={({target}) => setFullName(target.value)}
                label='Full name'
                />

            <Input
                type='text'
                placeholder='danielcipriano@example.com'
                value={email}
                onChange={({target}) => setEmail(target.value)}
                label='Email address'
                />

            <Input
                type='password'
                placeholder='Min 8 characters'
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label='Password'
                />

          </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>SIGN UP</button>
        <p className='text-[13px] text-slate-800 mt-3'>Already have an account? {" "} 
          <button 
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => {
              setCurrentPage('login');
            }}
            >
              Login
            </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp