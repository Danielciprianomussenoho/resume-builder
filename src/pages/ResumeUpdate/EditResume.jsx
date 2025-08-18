import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TitleInput from '../../components/inputs/TitleInput';
import { useReactToPrint } from "react-to-print";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import StepProgress from '../../components/StepProgress';
import ProfileInfoForm from './Forms/ProfileInfoForm';
import ContactInfoForm from './Forms/ContactInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import EducationDetailsForm  from './Forms/EducationDetailsForm ';
import SkillsInfoForm from './Forms/SkillsInfoForm';
import ProjectsDetailForm from './Forms/ProjectsDetailForm';
import CertificationInfoForm from './Forms/CertificationInfoForm';
import AdditionalInfoForm from './Forms/AdditionalInfoForm';


const EditResume = () => {
  const{ resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);  
  const [currentPage, setCurrentPage] = useState("additionalInfo");

  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title : "",
    thumbnailLink : "",
    profileInfo : {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: { 
      theme : "",
      colorPalette : "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0, //PERCENTAGE VALUE (0-100)
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certification: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0, //PERCENTAGE VALUE (0-100)
      },
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // validate inputs
  const validateAndNext = (e) => { };  

  // function to navigate to the next page
  const goToNextStep = () => {  };

  // function to navigate to the previous page
  const goBack = () => {  };

  const renderForm = () => { 
    switch (currentPage) {  
      case "profile-info":
        return (
        <ProfileInfoForm profileData={resumeData?.profileInfo} 
          updateSection={(key, value) => { 
            updateSection("profileInfo",  key, value);
          }} 
          onNext = {validateAndNext}
          />);
      case "contact-info":
        return ( 
          <ContactInfoForm
          contactInfo={resumeData?.contactInfo } 
           updateSection={(key, value) => { 
             updateSection("contactInfo",  key, value);
           }}
          />
        );
      case "work-experience":
        return (
        <WorkExperienceForm 
        WorkExperience={resumeData?.workExperience} 
          updateArrayItem={(index, key, value) => {
            updateArrayItem("workExperience", index, key, value);
          }}

          addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
          removeArrayItem={(index) => removeArrayItem("workExperience", index)}
        />);
      case "education":
        return (
        <EducationDetailsForm 
         educationInfo={resumeData?.education}
          updateArrayItem={(index, key, value) => {
            updateArrayItem("education", index, key, value);
          }}
          addArrayItem={(newItem) => addArrayItem("education", newItem)}
          removeArrayItem={(index) => removeArrayItem("education", index)}
        />);
      case "skills":
        return (
        <SkillsInfoForm
          skillsInfo={resumeData?.skills} 
          updateArrayItem={(index, key, value) => {
            updateArrayItem("skills", index, key, value);
          }}
          addArrayItem={(newItem) => addArrayItem("skills", newItem)}
          removeArrayItem={(index) => removeArrayItem("skills", index)}
        />);
      case "projects":
        return (
        <ProjectsDetailForm 
         projectInfo={resumeData?.projects} 
          updateArrayItem={(index, key, value) => {
            updateArrayItem("projects", index, key, value);
          }}
          addArrayItem={(newItem) => addArrayItem("projects", newItem)}
          removeArrayItem={(index) => removeArrayItem("projects", index)}
        />);
      case "certification":
        return (
        <CertificationInfoForm
          certification={resumeData?.certification}
          updateArrayItem={(index, key, value) => {
            updateArrayItem("certification", index, key, value);
          }}  
          addArrayItem = {(newItem) => addArrayItem("certification", newItem)}
         removeArrayItem = {(index) =>
          removeArrayItem("certification", index)
        }
        />);
      case "additionalInfo":
        return (
        <AdditionalInfoForm
         languages={resumeData.languages}
         interests={resumeData.interests}
         updateArrayItem = {(section, index, key, value) => 
          updateArrayItem(section, index, key, value)
         }
         addArrayItem = {(section,newItem) => addArrayItem(section, newItem)}
         removeArrayItem = {(section, index) => 
          removeArrayItem(section, index)
         }
         />);
      default:
        return null;
    }
  };
  // upate simple nested object (like profileInfo , contact , etc)
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev, [section]: {
                 ...prev[section],
                    [key]: value,
                  },
    }));
  }

  // update array of objects (like workExperience, education, etc)
  const updateArrayItem = (section, index, key, value) => {
     setResumeData((prev) => {
      const updateArray = [...prev[section]];

      if(key === null){
        updateArray[index] = value; //for simple string like in "interests"
      }else{
        updateArray[index] = {
          ...updateArray[index],
          [key]: value,
        };
      }
      return { ...prev, [section]: updateArray, };
    });
   };

  // add item to array
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // remove item from array
  const removeArrayItem = (section, index) =>{
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return { ...prev, [section]: updatedArray, };
    });
  }

  // fetch resume info by id
  const fetchResumeDetailsById = async () => {

    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId)); 
    
      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setResumeData((prevState) => ({
          ...prevState,
           title: resumeInfo?.title || "Sem título",
           template: resumeInfo?.template || prevState?.template,
           profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
           contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
           workExperience: resumeInfo?.workExperience || prevState?.workExperience,
           education: resumeInfo?.education || prevState?.education,
           skills: resumeInfo?.skills || prevState?.skills,
           projects: resumeInfo?.projects || prevState?.projects,
           certification: resumeInfo?.certification || prevState?.certification,
           languages: resumeInfo?.languages || prevState?.languages,
           interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
    }
    
  };

  // upload thumbnail and resume profile img
  const uploadResumeImages = async () => {
    
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
      };

// delete resume
const handleDeleteResume = async () => {

};

// download resume
const reactToPrintFn = useReactToPrint({contentRef: resumeDownloadRef}) 

// function to update baseWidth based on the resume container size
const updateBaseWidth = () => {
 
};

useEffect(() => {
  updateBaseWidth();
  window.addEventListener("resize", updateBaseWidth);

  if(resumeId) {
    fetchResumeDetailsById();
  }

  return () => {
    window.removeEventListener("resize", updateBaseWidth);
  };
},[])

  return (
    <DashboardLayout>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4'>
            <TitleInput 
            title={resumeData.title} 
            setTitle={(value) => 
              setResumeData((prevState) => ({ 
                ...prevState, title: value }))} 
            />

            <div className='flex items-center gap-4'>
              <button className='btn-small-light' onClick={() => setOpenThemeSelector(true)}>
                <LuPalette className="text-[16px]" />
                <span className='hidden md:block'>Mudar Tema</span>
              </button>

              <button className='btn-small-light' onClick={handleDeleteResume}>
                <LuTrash2 className="text-[16px]" />
                <span className='hidden md:block'>Apagar</span>
              </button>

              <button className='btn-small-light' onClick={() => setOpenPreviewModal(true)}>
                <LuDownload className="text-[16px]" />
                <span className='hidden md:block'>Visualização & baixar</span>
              </button>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='bg-white rounded-lg border border-purple-100 overflow-hidden'>
            
            <StepProgress progress={progress} />
            
            {renderForm()}

            <div className='mx-5'>
              {errorMsg && (
                <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded'>
                  <LuCircleAlert className='text-md' />
                  {errorMsg}
                </div>
              )}

              <div className='flex items-end justify-end gap-3 mt-3 mb-5'>
                <button className='btn-small-light' onClick={goBack} disabled={isLoading}> 
                  <LuArrowLeft className='text-[16px]' /> Voltar
                </button>

                <button className='btn-small-light' onClick={uploadResumeImages} disabled={isLoading}>
                  <LuSave className='text-[16px]' /> 
                  {isLoading ? "Salvando..." : "Salvar & Sair"}
                </button>

                <button className='btn-small' onClick={validateAndNext} disabled={isLoading}>
                  {currentPage === "additionalInfo" && (
                    <LuDownload className='text-[16px]' />
                    )}

                    {currentPage === "additionalInfo" 
                    ? "Visualizar & Baixar"
                    : "Próxima"}

                    {currentPage !== "additionalInfo" && (
                      <LuArrowLeft className='text-[16px] rotate-180' />
                    )}
                 
                </button>

              </div>
            </div>
          </div>

          <div ref={resumeRef} className='h-[100vh]'>
            {/* Render the resume template */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EditResume  //2.33.000