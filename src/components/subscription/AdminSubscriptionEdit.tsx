import React, { Component } from "react";
// import APIURL from "../../helpers/environment";
// import { FormControl, TextField, Button } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SubscriptionDetails } from "../../Interfaces";
// import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
// import EditIcon from "@material-ui/icons/Edit";
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';


type AcceptedProps = {
    sessionToken: string | null;
    subscriptionId: number;
};

type SubscriptionDataState = {
    subscriptionData: SubscriptionDetails[];
    results: SubscriptionDetails;
    subId: number;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    zip: string;
    subscription: any;
};

export default class AdminSubscriptionEdit extends Component<
    AcceptedProps,
    SubscriptionDataState
> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            subId: 0,
            streetAddress1: "",
            streetAddress2: "",
            city: "",
            state: '',
            zip: '',
            subscription: {},
            subscriptionData: [
                {
                    id: 0,
                    streetAddress1: "",
                    streetAddress2: "",
                    city: "",
                    state: '',
                    zip: '',
                },
            ],
            results: {
                id: 0,
                streetAddress1: "",
                streetAddress2: "",
                city: "",
                state: '',
                zip: '',
            },
        };
    }
    componentDidMount() {
        this.fetchSubscription();
        console.log("AdminSubscriptionEdit Props", this.props);
    }
    fetchSubscription = () => {
        if (this.props.sessionToken) {
            console.log("Before AdminSubscriptionEdit Fetch");
            fetch(`http://localhost:3000/subscription/one/${this.props.subscriptionId}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => res.json())
                .then((results) => {
                    this.setState({ subId: results.subscription.id });
                    this.setState({ streetAddress1: results.subscription.streetAddress1 });
                    this.setState({ streetAddress2: results.subscription.streetAddress2 });
                    this.setState({ city: results.subscription.city });
                    this.setState({ state: results.subscription.state });
                    this.setState({ zip: results.subscription.zip });
                    console.log("Record Id from Subscription Edit: ", results.subscription.id);
                })
                .catch((err) => console.log(err));
        }
    };

    handleSubmit = (event: any) => {
        console.log("As SubscriptionEdit Update");
        if (this.props.sessionToken) {
            event.preventDefault();
            fetch(`http://localhost:3000/subscription/updat/${this.props.subscriptionId}`, {
                method: "PUT",
                body: JSON.stringify({
                    subscription: {
                        streetAddress1: this.state.streetAddress1,
                        streetAddress2: this.state.streetAddress2,
                        city: this.state.city,
                        state: this.state.state,
                        zip: this.state.zip,
                    },
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.title);
                })
                .catch((err) => console.log(err));
        }
    };

    handleDelete = (id: number) => {
        if (this.props.sessionToken) {
            fetch(`http://localhost:3000/subscription/${this.props.subscriptionId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => {
                    this.fetchSubscription();
                })
                .catch((err) => alert(err));
        }
    };

    render() {
        return (
            <div>
                <div id="subscriptionEditDiv">
                    <h2 id="subscriptionEditHeading">Edit a Subscription</h2>
                    {/* <FormControl style={{ width: "50%", backgroundColor: "#FFFFFF" }}> */}
                    <div>
                        <TextField
                            label="Street Address 1"
                            variant="outlined"
                            type="text"
                            value={this.state.streetAddress1}
                            onChange={(e) => {
                                this.setState({ streetAddress1: e.target.value });
                            }}
                        />
                        <TextField
                            label="Street Address 2"
                            variant="outlined"
                            type="text"
                            value={this.state.streetAddress2}
                            onChange={(e) => {
                                this.setState({ streetAddress2: e.target.value });
                            }}
                        />
                    </div>
                    <TextField
                        label="City"
                        type="text"
                        value={this.state.city}
                        multiline
                        variant="outlined"
                        onChange={(e) => {
                            this.setState({ city: e.target.value });
                        }}
                    />
                    <TextField
                        label="State"
                        type="text"
                        value={this.state.state}
                        multiline
                        variant="outlined"
                        onChange={(e) => {
                            this.setState({ state: e.target.value });
                        }}
                    />
                    <TextField
                        label="Zip Code"
                        type="text"
                        value={this.state.zip}
                        multiline
                        variant="outlined"
                        onChange={(e) => {
                            this.setState({ zip: e.target.value });
                        }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Button
                            variant="contained"
                            onClick={(e) => {
                                this.handleSubmit(e);
                            }}
                        >
                            <Link style={{ color: "#000000" }} to="/admin/subscriptionList">
                                <EditIcon />
                  Edit a Subscription
                </Link>
                        </Button>
                        <Link to="/admin/subscriptionList">
                            <Button
                                variant="outlined"
                                color="primary"
                                value={this.state.subId}
                                onClick={(e) => {
                                    this.handleDelete(this.state.subId);
                                }}
                            >
                                <DeleteIcon />
                  Delete Board
                </Button>
                        </Link>
                    </div>
                    {/* </FormControl> */}
                </div>
            </div>
        );
    }
}
