import React, { useState } from "react";

const QuestionItem = ({ question, handleQuestion }) => {
    const [isSelect, setIsSelect] = useState(false);
    const selectClick = () => {
        setIsSelect(!isSelect);
        handleQuestion(question.question);
    };
    return (
        <div className={isSelect ? "question-item selected" : "question-item"}>
            <div className="w-auto block" onClick={selectClick}>
                <div className="w-full min-h-[5px]">
                { question.tag ? <div className="tag">{question.tag} ({question.prob})</div> : null }
                </div>
                <div className="w-full mt-[-8px]">
                    <div className="question">{question.question}</div>
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;
