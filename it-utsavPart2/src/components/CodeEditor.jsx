import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";

const CodeEditor = ({ value, setValue, selectedLanguage }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        language={selectedLanguage}
        value={value}
        onChange={(value) => { setValue(value) }}
        defaultValue="// Write your code here"
        options={{
          minimap: { enabled: !isMobile },
          scrollBeyondLastLine: false,
          fontSize: isMobile ? 14 : 16,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;