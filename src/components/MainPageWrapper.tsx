import React from "react";
import Navbar from "./Navbar";
import {FullScreenWrapper} from "../common/styledComponents/wrappers";
import Menu from "./Menu";
import {Switch, Route, Redirect} from "react-router-dom";
import AboutSystemWrapper from "./about_system_page/AboutSystemWrapper";
import AllUsersList from "./all_users_page/AllUsersList";
import GemstonesList from "./gemstones_page/GemstoneList";
import NewUsersList from "./new_users_page/NewUsersList";
import ModalWindow from "../common/components/ModalWindow";
import RequestsPage from "./requests_page/RequestsPage";
import AddPage from "./add_page_page/AddPage";
import Feedback from "./feedback_page/Feedback";


const MainPageWrapper: React.FC = () => (
    <FullScreenWrapper>
        <Menu />
        <div className="container-fluid p-0 d-flex flex-column">
            <Navbar />
            <Switch>
                <Route path='/new_users' component={NewUsersList} />
                <Route path='/about' component={AboutSystemWrapper}/>
                <Route path='/all_users' component={AllUsersList} />
                <Route path='/gems' component={GemstonesList} />
                <Route path='/requests' component={RequestsPage} />
                <Route path='/add_page' component={AddPage} />
                <Route path='/feedback' component={Feedback} />
                <Route render={() => <Redirect to="/about" />} />
            </Switch>
        </div>
        <ModalWindow />
    </FullScreenWrapper>
)

export default MainPageWrapper;