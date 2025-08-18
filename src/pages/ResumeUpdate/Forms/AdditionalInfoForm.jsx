import React from 'react'
import Input from '../../../components/inputs/Input';
import { LuPlus, LuTrash2 } from 'react-icons/lu'
import RatingInput from '../../../components/ResumeSections/RatingInput';

const AdditionalInfoForm = ({
    languages, 
    interests, 
    updateArrayItem,
    addArrayItem, 
    removeArrayItem
}) => {
  return (
    <div className=''>
         <h2 className='text-lg font-semibold text-gray-900'>Informações Adicionais</h2>

         {/* Languages Section */}
         <div className=''>
             <h3 className='text-lg font-semibold text-gray-900'>Idiomas</h3>

             <div className=''>
                {languages?.map((lang, index) => (
                    <div
                    key={index}
                    className=''
                    >
                        <div className=''>
                            <Input
                                label='Idiomas'
                                placeholder={"Ex: Inglês, Espanhol, português, etc. "}
                                type="text"
                                value={lang.name || ''}
                                onChange={({target}) => updateArrayItem("languages", index, 'name', target.value)}
                            />

                            <div className=''>
                                <label className=''>Proficiência</label>
                                <RatingInput
                                value={lang.progress || 0}
                                onChange={(value) => 
                                    updateArrayItem("languages", index, "progress", value)
                                }
                                total={5}
                                activeColor="#0ea5e9"
                                inactiveColor ="#e0f2fe"
                                />
                            </div>
                        </div>
                        {languages.length > 1 && (
                            <button
                            type='button'
                            className=''
                            onClick={() => removeArrayItem("languages", index)}
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
                        addArrayItem("languages", { name : "", progress : 0})}
                    >
                    <LuPlus/>
                    Adicionar Idioma
                    </button>
             </div>
         </div>
         {console.log(interests)}

         {/* Interests Section */}
         <div className=''>
            <h3 className='text-lg font-semibold text-gray-900'>Interesses</h3>
            <div className=''>
                {interests?.map((interest, index) => (
                    <div 
                    className=''
                    key={index}
                    >
                        <Input
                            placeholder={"Ex: Football, Ler, etc. "}
                            value={interest || ''}
                            onChange={({target}) => updateArrayItem("interests", index, null, target.value)}
                        />
                        {interests.length > 1 && (
                             <button
                            type='button'
                            className=''
                            onClick={() => removeArrayItem("interests", index)}
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
                        addArrayItem("interests", "")}
                    >
                    <LuPlus/>
                    Adicionar Interesse
                    </button>
            </div>
         </div>
    </div>
  )
}

export default AdditionalInfoForm  //325