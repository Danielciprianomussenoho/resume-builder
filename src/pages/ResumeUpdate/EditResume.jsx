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
import RenderResume from '../../components/ResumeTemplates/RenderResume';
import { captureElementAsImage, dataURLtoFile, fixTailwindColors } from '../../utils/helper';
import ThemeSelector from './ThemeSelector';
import Modal from '../../components/Modal';


const EditResume = () => {
  const{ resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);  
  const [currentPage, setCurrentPage] = useState("profile-info");

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
  const validateAndNext = (e) => {

    const errors = [];

    switch (currentPage){
      case "profile-info":
        const { fullName, designation, summary } = resumeData.profileInfo;

        if(!fullName.trim()) errors.push("O nome é obrigatório.");
        if(!designation.trim()) errors.push("Designação é obrigatória.");
        if(!summary.trim()) errors.push("O Resumo é obrigatório.");
        break;

      case "contact-info":
        const { email, phone} = resumeData.contactInfo;

        if(!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
          errors.push("Email valido é obrigatório.");
        if(!phone.trim()) errors.push("Pelo menos 9-digitos são validos.");
        break;

      case "work-experience":
        resumeData.workExperience.forEach(
          ({company, role, startDate, endDate}, index) => {
            if(!company.trim()) errors.push(`Nome da empresa é obrigatório na experiência ${index + 1}`);
            if(!role.trim()) errors.push(`Cargo é obrigatório na experiência ${index + 1}`);
            if(!startDate || !endDate) errors.push(` A data de inicio e fim são obrigatórios na experiência ${index + 1}`);
          });
          break;

      case "education-info":
        resumeData.education.forEach(
          ({degree, institution, startDate, endDate}, index) => {
            if(!degree.trim()) errors.push(`Formação é obrigatório na educação ${index + 1}`);
            if(!institution.trim()) errors.push(`A Instituição é obrigatória na educação ${index + 1}`);
            if(!startDate || !endDate) errors.push(` A data de inicio e fim são obrigatórios na educação ${index + 1}`);
          });
          break;
          
      case "skills":
        resumeData.skills.forEach(
          ({name, progress}, index) => {
            if(!name.trim()) errors.push(`O nome da habilidade é obrigatória ${index + 1}`);
            if(progress < 1 || progress > 100) errors.push(`O progresso tem ser entre 1 á 100 na habilidade ${index + 1}`);
          });
          break;

      case "projects":
        resumeData.projects.forEach(
          ({ title, description}, index) => {
            if(!title.trim()) errors.push(`O nome do projeto é obrigatório no ${index + 1}`);
            if(!description.trim()) errors.push(`A Descrição do projeto é obrigatória no projeto ${index + 1}`);
          });
          break;

      case "certification":
        resumeData.certification.forEach(
          ({ title, issuer}, index) => {
            if(!title.trim()) errors.push(`A certificação é obrigatória ${index + 1}`);
            if(!issuer.trim()) errors.push(`O nome do emissor é obrigatório no ${index + 1}`);
          });
          break;

      case "additionalInfo":
        if( resumeData.languages.length === 0 || 
            !resumeData.languages[0].name?.trim()
        ){
          errors.push("Pelo menos um idioma é obrigatório.");
        }
          
        if( resumeData.interests.length === 0 || 
            !resumeData.interests[0]?.trim()
        ){
          errors.push("Pelo menos um interesse é obrigatório. ");
        }
        break;

      default:
        break;
    }

    if(errors.length > 0){
      setErrorMsg(errors.join(", "));
      return;
    }

    // Move to next step
    setErrorMsg("");
    goToNextStep();
   };  

  // function to navigate to the next page
  const goToNextStep = () => { 

    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certification",
      "additionalInfo",
    ]

    if(currentPage === "additionalInfo") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);

    if(currentIndex !== -1 && currentIndex < pages.length - 1){

      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex])

        // Set progress as percentage
        const perecent = Math.round((nextIndex / (pages.length - 1)) * 100);
        setProgress(perecent);
        window.scrollTo({top : 0, behavior: "smooth"});
      
      } 
   };

  // function to navigate to the previous page
  const goBack = () => { 

     const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certification",
      "additionalInfo",
    ]

    if(currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);

    if(currentIndex > 0){

      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex])

        // Upadate progress as percentage
        const perecent = Math.round((prevIndex / (pages.length - 1)) * 100);
        setProgress(perecent);
        window.scrollTo({top : 0, behavior: "smooth"});
      } 
   };

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
    try {
      setIsLoading(true);

      fixTailwindColors(resumeRef.current);
      const imageDataUrl = await captureElementAsImage(resumeRef.current);

      // Convert base64 to file
      const thumbnailFile = dataURLtoFile(
        imageDataUrl,
        `resume-${resumeId}.png`
      );

      const profileImageFile = resumeData?.profileInfo?.profileImg || null;
      const formData = new FormData();
      if(profileImageFile) formData.append("profileImage", profileImageFile);
      if(thumbnailFile) formData.append("thumbnail", thumbnailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        {headers: {"Content-Type": "multipart/form-data"}}
      );

      const { thumbnailLink , profilePreviewUrl} = uploadResponse.data;

      console.log("RESUME_DATA_", resumeData);

      // Call the second API to update other resume data
      await updateResumeDetails(thumbnailLink, profilePreviewUrl);

      toast.success("Curriculo Actualizado com Sucesso!");
      navigate("/dashboard"); 
    } catch (error) {
      console.log("Erro ao fazer upload de images:", error);
      toast.error("Falha ao fazer upload de images");
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        {
          ...resumeData,
          thumbnailLink : thumbnailLink || "",
          profileInfo: {
            ...resumeData.profileInfo,
            profilePreviewUrl: profilePreviewUrl || "",
          }
        }
      );
    } catch (err) {
      console.log("Erro ao capturar image:", err);
    }finally{
      setIsLoading(false);
    }
  };

// delete resume
const handleDeleteResume = async () => {
  try {
    setIsLoading(true);
    const response = await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
    toast.success("Curriculo Apagado com Sucesso!")
    navigate("/dashboard")
  } catch (err) {
    console.error("Erro ao capturar a image:", err);
  }finally {
    setIsLoading(false);
  }
};

// download resume
const reactToPrintFn = useReactToPrint({contentRef: resumeDownloadRef}) 

// function to update baseWidth based on the resume container size
const updateBaseWidth = () => {
  if(resumeRef.current){
    setBaseWidth(resumeRef.current.offsetWidth);
  }
 
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

              <RenderResume
                templateId = {resumeData?.template?.theme || ""}
                resumeData= {resumeData}
                colorPalette = {resumeData?.template?.colorPalette || []}
                containerWidth = {baseWidth}
              />
          </div>
        </div>
      </div>

      <Modal 
        isOpen = {openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Mudar Tema"
        >
          <div className='w-[90vw] h-[80vh]'>
            <ThemeSelector
              selectedTheme={resumeData?.template}
              setSelectedTheme={(value) => {
                setResumeData((prevState) => ({
                  ...prevState,
                  template: value || prevState.template,
                }));
              }}
              resumeData={null}
              onClose={() => setOpenThemeSelector(false)}
              />
          </div>
          </Modal>

          <Modal
            isOpen={openPreviewModal}
            onClose={() => setOpenPreviewModal(false)}
            title={resumeData.title}
            showActionBtn
            actionBtnText="Baixar"
            actionBtnIcon={<LuDownload className='text-[16px]'/>}
            onActionClick={() => reactToPrintFn()}
            >
              <div ref={resumeDownloadRef} className='w-[98vw] h-[98vh]'>
                <RenderResume 
                  templateId={resumeData?.template?.theme || ""}
                  resumeData={resumeData}
                  colorPalette={resumeData?.template?.colorPalette || []}
                  />
              </div>
              </Modal>
    </DashboardLayout>
  )
}

export default EditResume  //3.36.000 inptus