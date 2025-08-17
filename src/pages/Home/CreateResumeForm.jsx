import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';

const CreateResumeForm = () => {
  const[title, setTitle] = useState("");
  const[error, setError] = useState(null);

  const navigate = useNavigate();

  // handle create resume
  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Por favor o titulo do curriculo é obrigatório.");
      return;
    }

    setError("");

    try {
      // Make API call to create resume
      const response =await axiosInstance.post(API_PATHS.RESUME.CREATE, { title });

      if(!response.data?._id) {
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }else {
        setError("Alguma coisa deu errado, Por favor tente de novo.");
      }
    }
  };

  return (
    <div className='w-[90vw] md:w-[70vh] p-7 flex flex-col justify-center '>
      <h3 className='text-lg font-semibold text-black'>Crie Seu Novo Currículo</h3>
      <p className='text-slate-700 text-sm mt-[5px] mb-3'>Digite o titulo do seu currículo para começar, você pode editar tudo depois.</p>
      
      {/* Form to create resume */}
      <form onSubmit={handleCreateResume}>
        <Input
          label="Título do Currículo"
          value={title}
          onChange={({target}) => setTitle(target.value)}
          placeholder="Eg: Currículo do Cipriano"
          type="text"
          />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type="submit" className="btn-primary">Criar Currículo</button>
      </form>
    </div>
  )
}

export default CreateResumeForm