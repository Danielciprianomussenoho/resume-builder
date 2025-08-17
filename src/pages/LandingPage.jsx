import React, { useState } from 'react'
import HERO_IMG from '../assets/hero.png'
import { useNavigate } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/Signup';
import Modal from '../components/Modal';
import { UserContext } from '../contexts/userContext';
import { useContext } from 'react';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const{ user } = useContext(UserContext);
  const navigate = useNavigate();

  const[openAuthModal, setOpenAuthModal] = useState(false);
  const[currentPage, setCurrentPage] = useState('login');

  const handleCTA = () => { 
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className='w-full min-h-full bg-white '>
      <div className='container mx-auto px-4 py-6'>
        {/* Header */}
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl font-bold'>Resume Builder</div>
          {user ? ( 
            <ProfileInfoCard /> 
          ) : ( 
          <button 
          onClick={() => setOpenAuthModal(true)} 
          className='bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer'
          >Login / Sign Up</button>) }
        </header> 

        {/* Hero Section */}
        <div className='flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-1/2 mb-8 md:mb-0'>
            <h1 className='text-5xl font-bold mb-6 leading-tight'>Build Your {""} <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine'>Resume Effortlessly</span> </h1>
            <p className='text-lg text-gray-70 mb-8'>Create a professional resume in minutes with our easy-to-use builder.</p>
            <button className='text-sm font-semibold text-white bg-black px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer' onClick={handleCTA}>Get Started</button>
          </div>

          <div className='w-full md:w-1/2'>
            <img src={HERO_IMG} alt="Hero" className='w-full rounded-lg' />
          </div>
        </div>

          <section className='mt-5'>
            <h2 className='text-2xl font-bold text-center mb-12'>Features That Make You Shine</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 '>
                <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
                  <h3 className='text-lg font-semibold mb-3'>Ease Editing</h3>
                  <p className='text-gray-600'>Upadte your resume sections with live preview and instant formatting.</p>
                </div>

                <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
                  <h3  className='text-lg font-semibold mb-3'>Beautiful Tempaltes</h3>
                  <p className='text-gray-600'> choose from modern , profissional tempaltes that are ease to customise .</p>
                </div>

                <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
                  <h3 className='text-lg font-semibold mb-3'>One-click Export</h3>
                  <p className='text-gray-600'>Download your resume instantly as a high-quality PDF one click.</p>
                </div>
            </div>
          </section>

      </div>
          <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5'>
             © 2025 Resume Builder. Daniel Cipriano, All rights reserved.
          </div>

          <Modal
            isOpen={openAuthModal}
            onClose={() => { 
              setOpenAuthModal(false);
              setCurrentPage("login");
            }}
             hideHeader
          >
            <div className=''>
              {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
              {currentPage === 'signup' && (<SignUp setCurrentPage={setCurrentPage} />)}
            </div>
          </Modal>
    </div>
  )
}

export default LandingPage