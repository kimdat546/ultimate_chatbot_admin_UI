import React, { useState, useEffect } from "react";
import QuestionItem from "components/QuestionItem";
import axios from "axios";
import Modal from "components/Modal";
import AlertMessage from "components/AlertMessage";
import { apiUrl } from "variables.js";

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [isShowing, setIsShowing] = useState(false);
    const [alert, setAlert] = useState(null);
    function toggle() {
        setIsShowing(!isShowing);
    }
    const getQuestion = async () => {
        try {
            const response = await axios.get(`${apiUrl}/questions`);
            setQuestions(response.data.questions);
        } catch (error) {
            console.log(error);
        }
    };
    const getTag = async () => {
        try {
            const response = await axios.get(`${apiUrl}/intents/tags`);
            setTags(response.data.tags);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getQuestion();
        getTag();
    }, []);
    const handleQuestionClick = (question) => {
        if (selectedQuestion.includes(question)) {
            setSelectedQuestion(
                selectedQuestion.filter((item) => item !== question)
            );
        } else {
            setSelectedQuestion([...selectedQuestion, question]);
        }
    };
    // const handlePattern = (questionsSelected) => {
    //     questionsSelected.forEach((question) => {
    //         setQuestions(questions.filter((item) => item !== question));
    //     });
    // };
    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
    };
    const handleAddPattern = async () => {
        if (selectedTag.length === 0 || selectedQuestion.length === 0) {
            setAlert({
                message: "Need at least one tag and one question",
                submessage: "Please try again",
                type: "error",
            });
            toggle();
        } else {
            const newPattern = {
                tag: selectedTag,
                pattern: selectedQuestion,
            };

            try {
                const response = await axios.post(
                    `${apiUrl}/intents/patterns`,
                    newPattern
                );
                if (response.data.success) {
                    setSelectedQuestion([]);
                    setSelectedTag("");
                    setAlert({
                        message: "Question has been added successfully",
                        submessage: "Click x button to close",
                        type: "happy-heart-eyes",
                        action: "load"
                    });
                    toggle();
                } else {
                    setAlert({
                        message: "Something went wrong",
                        submessage: "Please try again",
                        type: "error",
                        action: "load"
                    });
                    toggle();
                }
            } catch (error) {
                console.log(error.response);
            }
        }
    };
    const handleDeleteQuestions = async () => {
        if (selectedQuestion.length === 0) {
            setAlert({
                message: "Need to select at least one question to delete",
                submessage: "Select a question to delete",
                type: "error",
            });
            toggle();
        } else {
            const deleteQuestion = {
                questions: selectedQuestion,
            };
            try {
                const response = await axios.delete(`${apiUrl}/questions`, {
                    data: deleteQuestion,
                });
                if (response.data.success) {
                    setSelectedQuestion([]);
                    setAlert({
                        message: "Questions has been deleted successfully",
                        submessage: "Click x button to close",
                        type: "happy-heart-eyes",
                        action: "load"
                    });
                    toggle();
                } else {
                    setAlert({
                        message: "Something went wrong",
                        submessage: "Please try again",
                        type: "error",
                        action: "load"
                    });
                    toggle();
                }
            } catch (error) {
                console.log(error.response.data);
            }
            getQuestion();
        }
    };
    return (
        <>
            <Modal isShowing={isShowing}>
                <AlertMessage hide={toggle} info={alert} />
            </Modal>
            <div className="flex justify-end mb-[15px]">
                {/* <button
                    className="border-[1px] border-solid rounded-[3px] mr-4 px-[20px] py-[10px] bg-[#fff] hover:bg-[#282c31] hover:text-white"
                    onClick={getQuestion}
                >
                    Load
                </button> */}
                <button
                    className="border-[1px] border-solid rounded-[3px] mr-4 px-[20px] py-[10px] bg-[#fff] hover:bg-[#282c31] hover:text-white"
                    onClick={handleAddPattern}
                >
                    Add patterns
                </button>
                <button
                    className="border-[1px] border-solid rounded-[3px] mr-4 px-[20px] py-[10px] bg-[#fff] hover:bg-[#282c31] hover:text-white"
                    onClick={handleDeleteQuestions}
                >
                    Delete questions
                </button>
            </div>
            <div className="flex h-full">
                <div className="flex-1 flex w-[50%] overflow-auto">
                    <div className="bg-white flex-1 rounded-[5px] p-[10px] overflow-auto">
                        {questions.map((question, index) => (
                            <QuestionItem
                                key={index}
                                question={question}
                                handleQuestion={handleQuestionClick}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex-1 ml-[20px] flex flex-col w-[50%]">
                    <span className="text-gray-700">Select tag</span>
                    <select
                        className="block w-full mt-1 flex-1 overflow-auto"
                        multiple
                        onChange={handleTagChange}
                    >
                        {tags.map((tag, index) => (
                            <option
                                className="mb-[5px]"
                                key={index}
                                value={tag.tag}
                            >
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

export default Question;
