import React, { useEffect, useRef, useState } from 'react'
import {
    DUMMY_RESUME_DATA,
    resumeTemplates,
    themeColorPalette, // Verifique se esta exportação está correta
} from "../../utils/data"
import { LuCircleCheckBig } from 'react-icons/lu'
import Tabs from '../../components/Tabs';
import TemplateCard from '../../components/Cards/TemplateCard';
import RenderResume from '../../components/ResumeTemplates/RenderResume';

// CORREÇÃO: Nome da tab consistente
const TAB_DATA = [
    {label: "Templates"}, 
    {label: "Paleta de Cores"} // Nome igual ao verificado no código
];

const ThemeSelector = ({ selectedTheme, setSelectedTheme, resumeData, onClose }) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] =  useState(800);

    // CORREÇÃO: Valor inicial igual ao label da tab
    const [tabValue, setTabValue] = useState("Templates");
    const [selectdColorPalette, setSelectedColorPalette] = useState({
        colors: selectedTheme?.colorPalette,
        index: -1,
    });
    const [selectedTemplate, setSelectedTemplate] = useState({
        theme : selectedTheme?.theme || "",
        index: -1,
    });

    // handle theme change
    const handleThemeSelection = () => {
        setSelectedTheme({
            colorPalette: selectdColorPalette?.colors,
            theme : selectedTemplate?.theme,
        });
        onClose();
    };

    const updateBaseWidth = () => {
        if(resumeRef.current){
            setBaseWidth(resumeRef.current.offsetWidth);
        }
    };

    useEffect(() => {
        updateBaseWidth();
        window.addEventListener("resize", updateBaseWidth);

        return () => {
            window.removeEventListener("resize", updateBaseWidth);
        };
    }, []);

    // CORREÇÃO: Verifique a estrutura real do themeColorPalette
    console.log("Estrutura do themeColorPalette:", themeColorPalette);

    return (
        <div className='container mx-auto px-2 md:px-0'>
            <div className='flex items-center justify-between mb-5 mt-2'>
                <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue}/>

                <button 
                onClick={() => handleThemeSelection()}
                className='btn-small-light'
                >
                    <LuCircleCheckBig className='text-[16px]' />
                    Feito
                </button>
            </div>

            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-12 md:col-span-5 bg-white'>
                    <div className='grid grid-cols-2 gap-5 max-h-[80vh] overflow-scroll custom-scrollbar md:pr-5'>
                        {tabValue === "Templates" &&
                            resumeTemplates.map((template, index) => (
                                <TemplateCard 
                                  key={`templates_${index}`}
                                  thumbnailImg={template.thumbnailImg}
                                  isSelected={selectedTemplate?.index === index}
                                  onSelect={() =>
                                    setSelectedTemplate({theme: template.id, index})
                                  }
                                  />
                            ))}

                        {/* CORREÇÃO: Verificação correta do nome da tab */}
                        {tabValue === "Paleta de Cores" && 
                            // CORREÇÃO: Verifique a estrutura real dos dados
                            themeColorPalette.themeOne.map((colors, index) => (
                                <ColorPalette
                                    key={`palette_${index}`}
                                    colors={colors}
                                    isSelected={selectdColorPalette?.index === index}
                                    onSelect={() => setSelectedColorPalette({colors, index})}
                                    />
                            ))}
                    </div>
                </div>
                <div className='col-span-12 md:col-span-7 bg-white -mt-3' ref={resumeRef}>
                    {/* Preview do resume aqui */}
                    <RenderResume
                        templateId={selectedTemplate?.theme || ""}
                        resumeData={resumeData || DUMMY_RESUME_DATA}
                        containerWidth={baseWidth}
                        colorPalette={selectdColorPalette?.colors || []}
                        />
                </div>
            </div>
        </div>
    )
}

export default ThemeSelector;

const ColorPalette = ({ colors, isSelected, onSelect }) => {
    // CORREÇÃO: Verificação se colors é um array
    if (!Array.isArray(colors)) {
        console.error("Colors não é um array:", colors);
        return null;
    }

    return (
        <div
        className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 ${
            isSelected ? "border-purple-500" : "border-none"
        } cursor-pointer`} // Adicionei cursor-pointer
        onClick={onSelect}
        >
            {colors.map((color, index) => (
                <div
                key={`color_${index}`}
                className='flex-1'
                style={{backgroundColor: color}} // CORREÇÃO: Use color em vez de colors[index]
                />
            ))}
        </div>
    );
};