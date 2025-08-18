import React from 'react'
import Input from '../../../components/inputs/Input';

 
const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className='px-5 pt-5'>
      <h2 className='text-lg font-semibold text-gray-900'>Informações de Contato</h2>
      
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='col-span-2'>
          <Input
            type='text'
            value={contactInfo.location || ""}
            onChange={({target}) => updateSection("location", target.value)}
            label={"Endereço"}
            placeholder={"Ex: Avenida Angola, 93"}
          />
        </div>

 
          <Input
            type='email'
            value={contactInfo.email || ""}
            onChange={({target}) => updateSection("email", target.value)}
            label={"Email"}
            placeholder={"Ex: cipriano@exemplo.com"}
          />

          <Input
            type='text'
            value={contactInfo.phone || ""}
            onChange={({target}) => updateSection("phone", target.value)}
            label={"Telefone"}
            placeholder={"Ex: (+351) 912 345 678"}
          />

          <Input
            type='text'
            value={contactInfo.linkedin || ""}
            onChange={({target}) => updateSection("linkedin", target.value)}
            label={"LinkedIn"}
            placeholder={"Ex: https://www.linkedin.com/in/username/"}
          />

          <Input
            type='text'
            value={contactInfo.github || ""}
            onChange={({target}) => updateSection("github", target.value)}
            label={"GitHub"}
            placeholder={"Ex: https://github.com/username"}
          />


        <div className='md:col-span-2'>
          <Input
            type='text'
            value={contactInfo.website || ""}
            onChange={({target}) => updateSection("website", target.value)}
            label={"Portfolio / Website"}
            placeholder={"Ex: https://www.seusite.com"}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactInfoForm