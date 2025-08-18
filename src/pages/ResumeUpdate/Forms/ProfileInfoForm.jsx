import React from 'react'
import ProfilePhotoSelector from '../../../components/inputs/ProfilePhotoSelector';
import Input from '../../../components/inputs/Input';


const ProfileInfoForm = ({ profileData, updateSection }) => {
  return (
    <div className='px-5 pt-5'>
      <h2 className='text-lg font-semibold text-gray-900'>Informação Pessoal</h2>

      <div className='mt-4'>
        <ProfilePhotoSelector 
            image = {profileData?.profileImg || profileData?.profilePreviewUrl}
            setImage={(value) => updateSection("profileImg", value)}
            preview={profileData?.profilePreviewUrl}
            setPreview={(value) => updateSection("profilePreviewUrl", value)}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            type="text"
            placeholder="Ex: Daniel Cipriano"
            value={profileData.fullName || ''}
            onChange={(target) => updateSection("fullName", target.value)}
            label={"Nome Completo"}
          />

          <Input
            type="text"
            placeholder="Ex: Desenvolvedor Full Stack"
            value={profileData.designation || ''}
            onChange={(target) => updateSection("designation", target.value)}
            label={"Designação"}
          />

          <div className='col-span-2 mt-3'>
            <label className='text-xs font-medium text-slate-600'>
                Resumo
            </label>

            <textarea 
              className='form-input'
              rows={4}
              value={profileData.summary || ''}
              onChange={(target) => updateSection("summary", target.value)}
              placeholder='Ex: Sou um desenvolvedor com 5 anos de experiência em...'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoForm