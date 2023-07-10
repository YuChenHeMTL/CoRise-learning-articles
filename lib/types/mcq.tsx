import { useState } from "react";
import utilstyles from '@/styles/utils.module.css'
import { MCQ } from "../types";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { BsClipboardCheck } from "react-icons/bs";
import React from 'react';
import BlockLayout from "@/components/blockLayout";

export function getMultipleChoice( data: Object ) {
    let content = data as MCQ
    const [value, setValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    const handleSubmit = () => {
        setShowFooter(true);
        setShowResults(value != content.CorrectOption)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    let options = content.IncorrectOptions

    return (
        <BlockLayout>
            <form className={utilstyles.mcq}>
                <div className={utilstyles.title}>
                    <BsClipboardCheck /> Quick Quiz 
                </div>
                <div className={utilstyles.question}>
                    {content.Question}
                </div>
                {options.map((option) => (
                    <div className="radio" key={option}>
                        <label>
                            <input type="radio" className={utilstyles.input} value={option} onChange={handleChange} checked={value == option}/>
                            {option}
                        </label>
                    </div>
                ))}
                <button type="button" className={utilstyles.submit} onClick={handleSubmit}>
                    Submit
                </button>
                <div className={utilstyles.result}>
                    {
                        showFooter? (
                            showResults ? (
                                <div>
                                    {content.FeedbackOnIncorrect}
                                </div>
                            ) : (
                                "You got it!"
                            )
                        ) : null
                    }
                </div>
            </form>
        </BlockLayout>
        
    )
}