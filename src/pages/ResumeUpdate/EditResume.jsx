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
import {useReactToPrint} from "react-to-print";


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
  const validateAndNext = (e) => { };  

  // function to navigate to the next page
  const goToNextStep = () => {  };

  // function to navigate to the previous page
  const goBack = () => {  };

  const renderForm = () => {   }

  // upate simple nested object (like profileInfo , contact , etc)
  const updateSection = (section, key, value) => {}

  // update array of objects (like workExperience, education, etc)
  const updateArrayItem = (section, index, key, value) => { };

  // add item to array
  const addArrayItem = (section, newItem) => {
  
  };

  // remove item from array
  const removeArrayItem = (section, index) =>{}

  // fetch resume info by id
  const fetchResumeDetailsById = async () => {

    
  };

  // upload thumbnail and resume profile img
  const uploadResumeImages = async () => {
    
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
      };

// delete resume
const deleteResume = async () => {

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
                ...prevState, title: value }))} />
        </div>



        <div className=''>
          <h2>Edit Resume</h2>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EditResume  //2.33.000