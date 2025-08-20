import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuPlus, LuTrash2 } from 'react-icons/lu'


const WorkExperienceForm = ({WorkExperience, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>Experiência de Trabalho</h2>

        {WorkExperience.map((experience, index) => (
            
          <div key={index} className='mt-4 flex flex-col gap-4 mb-3'>
            <div className='border border-gray-200/80 p-4 rounded-lg relative'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    <Input
                    label={"Empresa"}
                    placeholder='Ex: Empresa XYZ'
                    type="text"
                    value={experience.company || ''}
                    onChange={({target}) => updateArrayItem(index, 'company', target.value)}
                    />

                    <Input
                    label={"Designação / Cargo"}
                    placeholder='Ex: Desenvolvedor Frontend'
                    type="text"
                    value={experience.role || ''}
                    onChange={({target}) => updateArrayItem(index, 'role', target.value)}
                    />

                    <Input
                    label={"Data de Início"}
                    type="month"
                    value={experience.startDate || ''}
                    onChange={({target}) => updateArrayItem(index, 'startDate', target.value)}
                    />

                    <Input
                    label={"Data de Término"}
                    type="month"
                    value={experience.endDate || ''}
                    onChange={({target}) => updateArrayItem(index, 'endDate', target.value)}
                    />  
                    </div>

                    <div className='mt-4'>
                      <label className='text-xs font-medium text-slate-600' >Descrição</label>
                      <textarea
                        placeholder='Descreva suas responsabilidades e conquistas nesse cargo...'
                        type="text"
                        rows={3}
                        className='form-input w-full mt-1'
                        value={experience.description || ''}
                        onChange={({target}) => updateArrayItem(index, 'description', target.value)}
                      />
                    </div>
                  
                  {WorkExperience.length > 1 && (
                    <button 
                        type='button' 
                        className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer' 
                        onClick={() => removeArrayItem(index)}
                        >
                            <LuTrash2 />
                    </button>
                    )}
                   </div>
                 
                   <button 
                   className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer'
                   type='button'
                   onClick={() => 
                    addArrayItem({
                        company: '',
                        role: '',
                        startDate: '',
                        endDate: '',
                        description: ''
                    })}
                   >
                   <LuPlus className='cursor-pointer'/> Adicionar Experiência
                   </button>
              </div>
          
        ))}
    </div>
  )
}

export default WorkExperienceForm