import React from "react";
import { Route, Switch } from "react-router-dom";
import Question from "views/Question";
import Intents from "views/Intents";
import AddIntent from "views/AddIntent";
import DetailIntents from "views/DetailIntents";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Question} />
            <Route exact path="/intents" component={Intents} />
            <Route exact path="/addintent" component={AddIntent} />
            <Route exact path="/intents/edit/:id" component={DetailIntents} />
        </Switch>
    );
};

export default Router;
