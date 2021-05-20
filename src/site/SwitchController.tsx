import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { Admin } from '../components/admin/Admin';
import UserEdit from "../components/user/UserEdit";
import User from "../components/user/User";
import AdminUserTable from "../components/admin/AdminUserTable";
import AdminEditUser from "../components/admin/AdminEditUser";
import SubscriptionCreate from "../components/subscription/SubscriptionCreate";
import SubscriptionTable from "../components/subscription/SubscriptionTable";
import SubscriptionEdit from "../components/subscription/SubscriptionEdit";
import AdminSubscriptionTblDel from "../components/subscription/AdminSubscriptionTblDel";
import AdminSubscriptionMgmt from "../components/subscription/AdminSubscriptionMgmt";
import AdminSubscriptionEdit from "../components/subscription/AdminSubscriptionEdit";
import ProfileCreate from "../components/Profile/ProfileCreate";
import ProfileTable from "../components/Profile/ProfileTable";
import AdminProfileTblDel from "../components/Profile/AdminProfileTblDel";
import AdminProfileEdit from "../components/Profile/AdminProfileEdit";
import ProfileEdit from "../components/Profile/ProfileEdit";
import AdminProfileMgmt from "../components/Profile/AdminProfileMgmt";
import Auth from "../auth/Auth";


type ControllerProps = {
    updateSessionToken: (newToken: string) => void;
    updateUserRole: (newUserRole: string) => void;
    updateEmail: (newEmail: string) => void;
    protectedViews: () => void;
    clearUser: () => void;
    updateProfileId: (newProfileId: number) => void;
    updateSubscriptionId: (newSubscriptionId: number) => void;
    updateUserId: (newUserId: number) => void;
    sessionToken: any;
    email: string | null | undefined;
    userRole: string;
    profileId: number;
    subscriptionId: number;
    userId: number;
};

const SwitchController: FC<ControllerProps> = (props) => {
    console.log("switchController: ", props.sessionToken);

    return (
        <div className="ViewsDiv">
            <div className="routes">
                <Switch>
                    <Route exact path="/home"></Route>
                    <Route exact path="/auth">
                        <Auth
                            updateSessionToken={props.updateSessionToken}
                            updateUserRole={props.updateUserRole}
                        />
                    </Route>
                    <Route exact path="/admin/home">
                        <Admin />
                    </Route>
                    <Route exact path="/user/edit">
                        <UserEdit
                            sessionToken={props.sessionToken}
                            clearUser={props.clearUser}
                        />
                    </Route>
                    <Route exact path="/user/home">
                        <User />
                    </Route>
                    <Route exact path="/admin/userTable">
                        <AdminUserTable
                            sessionToken={props.sessionToken}
                            userId={props.userId}
                            updateUserId={props.updateUserId}
                        />
                    </Route>
                    <Route exact path="/admin/edit">
                        <AdminEditUser
                            sessionToken={props.sessionToken}
                            email={props.email}
                            userId={props.userId}
                            updateUserId={props.updateUserId}
                        />
                    </Route>
                    <Route exact path="/subscription/signup">
                        <SubscriptionCreate sessionToken={props.sessionToken} />
                    </Route>
                    <Route exact path="/subscription/mine">
                        <SubscriptionTable
                            sessionToken={props.sessionToken}
                            // subscriptionId={props.subscriptionId}
                            // updateSubscriptionId={props.updateSubscriptionId}
                        />
                    </Route>
                    <Route exact path="/user/subscriptionEdit">
                        <SubscriptionEdit
                            sessionToken={props.sessionToken}
                            subscriptionId={props.subscriptionId}
                        />
                    </Route>
                    <Route exact path="/profile/update">
                        <ProfileEdit
                            sessionToken={props.sessionToken}
                            profileId={props.profileId}
                        />
                    </Route>
                    <Route exact path="/admin/subscriptionList">
                        <AdminSubscriptionTblDel
                            sessionToken={props.sessionToken}
                            subscriptionId={props.subscriptionId}
                            updateSubscriptionId={props.updateSubscriptionId}
                        />
                    </Route>
                    <Route exact path="/admin/subscription">
                        <AdminSubscriptionMgmt />
                    </Route>
                    <Route exact path="/admin/subscriptionEdit">
                        <AdminSubscriptionEdit
                            sessionToken={props.sessionToken}
                            subscriptionId={props.subscriptionId}
                        />
                    </Route>
                    <Route exact path="/profile/add">
                        <ProfileCreate sessionToken={props.sessionToken} />
                    </Route>
                    <Route exact path="/profile/mine">
                        <ProfileTable sessionToken={props.sessionToken} />
                    </Route>
                    <Route exact path="/admin/profileList">
                        <AdminProfileTblDel
                            sessionToken={props.sessionToken}
                            profileId={props.profileId}
                            updateProfileId={props.updateProfileId}
                        />
                    </Route>
                    <Route exact path="/admin/profileEdit">
                        <AdminProfileEdit
                            sessionToken={props.sessionToken}
                            profileId={props.profileId}
                        />
                    </Route>
                    <Route exact path="/profile/mine">
                        <ProfileEdit
                            sessionToken={props.sessionToken}
                            profileId={props.profileId}
                        />
                    </Route>
                    <Route exact path="/admin/profiles">
                        <AdminProfileMgmt />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default SwitchController;
