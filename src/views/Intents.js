import React, { useEffect, useContext, useState } from "react";
import { IntentContext } from "contexts/IntentContext";
import IntentsItem from "components/IntentsItem";
import Spinner from "components/Spinner";
import { NavLink } from "react-router-dom";
import Modal from "components/Modal";
import AlertMessage from "components/AlertMessage";

const Intents = () => {
    // Contexts
    const {
        intentState: { intents, intentsLoading, trainLoading },
        getIntents,
        trainIntents,
    } = useContext(IntentContext);

    //Get all intents
    useEffect(() => {
        getIntents();
    });
    const [isShowing, setIsShowing] = useState(false);
    const [alert, setAlert] = useState(null);
    function toggle() {
        setIsShowing(!isShowing);
    }
    const trainModel = async () => {
        const response = await trainIntents();
        console.log(response);
        if (response.success === "true") {
            setAlert({
                message: response.mess,
                submessage: "Click x button to close",
                type: "happy-heart-eyes",
            });
            toggle();
        } else {
            setAlert({
                message: response.mess,
                submessage: "Please try again",
                type: "error",
            });
            toggle();
        }
    };
    if (intentsLoading || trainLoading) {
        return <Spinner />;
    } else if (intents.length === 0) {
        return <h2>Not found intents have been created</h2>;
    } else
        return (
            <>
                <Modal isShowing={isShowing}>
                    <AlertMessage hide={toggle} info={alert} />
                </Modal>
                <div className="flex justify-end mb-[15px]">
                    <NavLink
                        exact
                        to="/addintent"
                        className="border-[1px] border-solid rounded-[3px] mr-4 px-[20px] py-[10px] bg-[#fff] hover:bg-[#282c31] hover:text-white"
                    >
                        Add intent
                    </NavLink>
                    <button
                        className="border-[1px] border-solid rounded-[3px] mr-4 px-[20px] py-[10px] bg-[#fff] hover:bg-[#282c31] hover:text-white"
                        onClick={trainModel}
                    >
                        Train model
                    </button>
                </div>
                <div className="overflow-y-auto overflow-x-hidden bg-white pt-[20px] px-[10px]">
                    {intents.map((intent) => {
                        return <IntentsItem key={intent._id} value={intent} />;
                    })}
                </div>
            </>
        );
};

export default Intents;
