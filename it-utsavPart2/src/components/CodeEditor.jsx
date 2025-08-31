import { Editor } from "@monaco-editor/react";
import { useState } from "react";
const CodeEditor = ({value, setValue,selectedLanguage})=>{
    
    console.log(value)
    return (
        <>
        <Editor
        height="62vh"
        width="35vw"
        theme="vs-dark"
        defaultLanguage={selectedLanguage}
        value={value}
        onChange={(value)=>{setValue(value)}}
        defaultValue="//Write your code here"
        
        />
        </>
    )
}

export default CodeEditor;