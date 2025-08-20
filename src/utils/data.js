import TEMPLATE_ONE_IMG from "../assets/template-one.png"
import TEMPLATE_TWO_IMG from "../assets/template-two.png"
import TEMPLATE_THREE_IMG from "../assets/template-three.png"

export const resumeTemplates = [
    {
        id: "01",
        thumbnailImg: TEMPLATE_ONE_IMG,
        colorPaletteCode: "themeOne"
    },
    {
        id: "02",
        thumbnailImg: TEMPLATE_TWO_IMG,
        colorPaletteCode: "themeTwo"
    },
    {
        id: "03",
        thumbnailImg: TEMPLATE_THREE_IMG,
        colorPaletteCode: "themeThree"
    },
]

export const themeColorPalette = {
    themeOne : [
        ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],

        ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
        ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
        ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
        ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
        ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],

        ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
        ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
        ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
        ["#FFFDF6", "#FFF4D7", "#FFF7A0", "#FFD000", "#57534E"],
        ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],

        ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
        ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0D47A1"],
    ],
};

export const DUMMY_RESUME_DATA = {
    profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "Daniel Cipriano",
        designation: "FullStack Developer",
        summary: " Sites de Notícias Automáticas : notícias sobre doramas, futebol, tecnologia, celebridades, promoções, games ",
    },
    contactInfo: {
        email: "daniel@example.com",
        phone: "+99242565678",
        location: "Portugal , Lisboa",
        linkedin: "https://www.linkedin.com/in/danielciprianomussenoho/",
        github: " https://www.github.com/danielciprianomussenoho/",
        website: "https://danielciprianomussenoho"
    },
    workExperience: [
    {
        company: "tech prob",
        role: "mechnic",
        startDate: "2022-02",
        endDate: "2023-02",
        description: " carros blabla Sites de Notícias Automáticas : notícias sobre doramas, futebol, tecnologia, celebridades, promoções, games ",
    },
    {
        company: "tech prob2",
        role: "mechnic2",
        startDate: "2022-03",
        endDate: "2023-03",
        description: " carros blabla Sites de Notícias Automáticas : notícias sobre doramas, futebol, tecnologia, celebridades, promoções, games ",
    },
],
    education: [
    {
        degree: "engenheiro",
        instituition: "IST",
        startDate: "2022-03",
        endDate: "2023-03",
    },
    {
        degree: "engenheiro2",
        instituition: "IST1",
        startDate: "2022-07",
        endDate: "2023-09",
    },
],
    skills: [ 
    {name: "java", progress: 95},
    {name: "javascript", progress: 30},
    {name: "html", progress: 55},
    {name: "react", progress: 65},
    {name: "python", progress: 75},
],
    projects: [
    {
        title: "projeto1",
        description: "Sites de Notícias Automáticas : notícias sobre doramas, futebol, tecnologia, celebridades, promoções, games ",
        github: " https://www.github.com/danielciprianomussenoho/",
        liveDemo: " https://www.github.com/danielciprianomussenoho/",
    },
    {
        title: "projeto2",
        description: "Sites de Notícias Automáticas : notícias sobre doramas, futebol, tecnologia, celebridades, promoções, games ",
        github: " https://www.github.com/danielciprianomussenoho/",
        liveDemo: " https://www.github.com/danielciprianomussenoho/",
    },
],
    certification: [
    {
        title: "web dev",
        issuer: "udemy",
        year: "2020",
    },
    {
        title: "web dev2",
        issuer: "udemy2",
        year: "2025",
    },
],
    languages: [
    {
        name: "ingles",
        progress: 100,
    },
    {
        name: "espanhol",
        progress: 10,
    },
    {
        name: "frances",
        progress: 50,
    },
],
    interests: ["jogos", "ler", "correr"],
}