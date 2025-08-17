import React, { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
    const inputsRef = useRef(null);
    const[previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {

        const file = event.target.files[0];

        if (file) {
            // update the image state
            setImage(file);
            
            // create a preview URL from thw file
            const preview = URL.createObjectURL(file);

            if (setPreview) {
                setPreview(preview);
                
            }
            setPreviewUrl(preview);
        }               
    };

    const handleRemoveImage = () => {

        setImage(null);
        setPreviewUrl(null);

        if (setPreview) {
           setPreview(null);
        }
    };  

    const onChooseFile = () => {
        inputsRef.current.click();
    };

  return (
    <div className='flex justify-center mb-6'>
        <input
            type='file'
            accept='image/*'
            ref={inputsRef}
            onChange={handleImageChange}
            className='hidden'
        />
        {!image ? (

            <div className='w-20 h-20 flex items-center justify-center bg-purple-50 rounded-full relative cursor-pointer'>
           
                <LuUser className='text-4xl w-16 h-16 text-purple-500' />
            
            <button 
            type='button'
            onClick={onChooseFile} 
            className='w-8 h-8  flex items-center justify-center bg-linear-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'>
                <LuUpload />
            </button>
            </div>
            ):(
            <div className='relative'>
               <img 
                src={preview || previewUrl}
                alt="profile photo" 
                className='w-20 h-20 object-cover rounded-full'
                />
                <button 
                 type='button'
                 onClick={handleRemoveImage} 
                 className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                 >

                    <LuTrash className='' />
                </button>
            </div>
            )}
    </div>
  )
}

export default ProfilePhotoSelector 