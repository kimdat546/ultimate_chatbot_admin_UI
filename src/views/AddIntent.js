/* eslint-disable */
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { IntentContext } from "contexts/IntentContext";
import Modal from "components/Modal";
import AlertMessage from "components/AlertMessage";

const AddIntent = () => {
    const [detailIntent, setDetailIntents] = useState({
        name: "",
        tag: "",
        patterns: [],
        response: [],
    });

    //context
    const { addIntent } = useContext(IntentContext);

    const [isShowing, setIsShowing] = useState(false);
    const [alert, setAlert] = useState(null);
    function toggle() {
        setIsShowing(!isShowing);
    }

    const onAccept = async () => {
        const response = await addIntent(detailIntent);
        if (response.success) {
            setAlert({
                message: "Intent added successfully",
                submessage: "Click x button to close",
                type: "happy-heart-eyes",
                action: "redirect",
                url: "/intents",
            });
            toggle();
        } else {
            setAlert({
                message: "Intent not added",
                submessage: "Please try again",
                type: "error",
                action: "load",
            });
            toggle();
        }
    };

    const handleChangeInput = (e) => {
        setDetailIntents((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChangePattern = (e) => {
        setDetailIntents((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.split(","),
        }));
    };
    const handleChangeResponse = (e) => {
        setDetailIntents((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.split(";"),
        }));
    };
    const ChangeToSlug = (text) => {
        var slug;
        slug = text.toLowerCase();
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
        slug = slug.replace(/đ/gi, "d");
        slug = slug.replace(
            /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
            ""
        );
        slug = slug.replace(/ /gi, "_");
        slug = slug.replace(/\-\-\-\-\-/gi, "_");
        slug = slug.replace(/\-\-\-\-/gi, "_");
        slug = slug.replace(/\-\-\-/gi, "_");
        slug = slug.replace(/\-\-/gi, "_");
        slug = "@" + slug + "@";
        slug = slug.replace(/\@\-|\-\@|\@/gi, "");
        return slug;
    };
    const handleChangeTag = (e) => {
        setDetailIntents((prevState) => ({
            ...prevState,
            [e.target.name]: ChangeToSlug(detailIntent.name),
        }));
    };
    return (
        <>
            <Modal isShowing={isShowing}>
                <AlertMessage hide={toggle} info={alert} />
            </Modal>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                value={detailIntent.name}
                onChange={handleChangeInput}
            />
            <label htmlFor="tag">Tag</label>
            <input
                type="text"
                name="tag"
                value={detailIntent.tag}
                onChange={handleChangeInput}
                onFocus={handleChangeTag}
            />
            <label htmlFor="patterns">Patterns</label>
            <textarea
                name="patterns"
                cols="30"
                rows="10"
                value={detailIntent.patterns}
                onChange={handleChangePattern}
            ></textarea>
            <label htmlFor="response">Response</label>
            <textarea
                name="response"
                cols="30"
                rows="10"
                value={detailIntent.response}
                onChange={handleChangeResponse}
            ></textarea>
            <div className="flex justify-end">
                <button
                    className="border-[1px] border-solid rounded-[3px] mr-4 px-[20px] py-[10px] bg-[#fff] hover:bg-[#282c31] hover:text-white"
                    onClick={onAccept}
                >
                    Accept
                </button>
                <NavLink
                    exact
                    to="/intents"
                    className="border-[1px] border-solid rounded-[3px] mr-4 px-[20px] py-[10px] bg-[#fff] hover:bg-[#282c31] hover:text-white"
                >
                    Cancel
                </NavLink>
            </div>
        </>
    );
};

export default AddIntent;
