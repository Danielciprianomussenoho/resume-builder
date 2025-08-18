import React from 'react'
import Input from '../../../components/inputs/Input';
import { LuPlus, LuTrash2 } from 'react-icons/lu'


const CertificationInfoForm = ({
    certification,  
    updateArrayItem, 
    addArrayItem, 
    removeArrayItem
}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>Certificações</h2>

        <div className='mt-4 flex flex-col gap-4 mb-3'>
            {certification.map((cert, index) => (
                <div 
                key={index}
                className='border border-gray-200/80 p-4 rounded-lg relative'
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                         <Input
                            label='Título do Certificado'
                            placeholder={"Ex: Densevolvedor Fullstack "}
                            type="text"
                            value={cert.title || ''}
                            onChange={({target}) => updateArrayItem(index, 'title', target.value)}
                        />

                         <Input
                            label='Emitido Pelo'
                            placeholder={"Ex: Universidade / Google / etc. "}
                            type="text"
                            value={cert.issuer || ''}
                            onChange={({target}) => updateArrayItem(index, 'issuer', target.value)}
                        />

                         <Input
                            label='Ano'
                            placeholder={"Ex: 2024. "}
                            type="text"
                            value={cert.year || ''}
                            onChange={({target}) => updateArrayItem(index, 'year', target.value)}
                        />
                    </div>

                    {certification.length > 1 && (
                        <button
                        type='button'
                         className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer' 
                        onClick={() => removeArrayItem(index)}
                        >
                            <LuTrash2/>
                        </button>
                    )}
                    </div>
            ))}
                    <button 
                    type='button'
                     className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer'
                    onClick={() => 
                        addArrayItem({
                        title : "",
                        issuer : "",
                        year : "",
                    })}
                   >
                    <LuPlus/>
                    Adicionar Certificado
                   </button>
                </div>
    </div>
  )
}

export default CertificationInfoForm

