import React, { Component } from "react";
// import APIURL from "../../helpers/environment";
// import { FormControl, TextField, Button } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ProfileDetails } from "../../Interfaces";
// import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
// import EditIcon from "@material-ui/icons/Edit";
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';


type AcceptedProps = {
  sessionToken: string | null;
  profileId: number;
};

type ProfileDataState = {
  profileData: ProfileDetails[];
  results: ProfileDetails;
  profId: number;
  title: string;
  picture: string;
  details: string;
  profile: any;
};

export default class AdminProfileEdit extends Component<
  AcceptedProps,
  ProfileDataState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      profId: 0,
      title: "",
      picture: "",
      details: "",
      profile: {},
      profileData: [
        {
          id: 0,
          title: "",
          picture: "",
          details: "",
        },
      ],
      results: {
        id: 0,
        title: "",
        picture: "",
        details: "",
      },
    };
  }
  componentDidMount() {
    this.fetchProfile();
    console.log("AdminProfileEdit Props", this.props);
  }
  fetchProfile = () => {
    if (this.props.sessionToken) {
      console.log("Before AdminProfileEdit Fetch");
      fetch(`http://localhost:3000/profile/one/${this.props.profileId}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          this.setState({ profId: results.profile.id });
          this.setState({ title: results.profile.title });
          this.setState({ picture: results.profile.picture });
          this.setState({ details: results.profile.details });
          console.log("Record Id from Profile Edit: ", results.profile.id);
        })
        .catch((err) => console.log(err));
    }
  };

  handleSubmit = (event: any) => {
    console.log("As ProfileEdit Update");
    if (this.props.sessionToken) {
      event.preventDefault();
      fetch(`http://localhost:3000/profile/updat/${this.props.profileId}`, {
        method: "PUT",
        body: JSON.stringify({
          profile: {
            title: this.state.title,
            picture: this.state.picture,
            details: this.state.details,
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
      fetch(`http://localhost:3000/profile/${this.props.profileId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => {
          this.fetchProfile();
        })
        .catch((err) => alert(err));
    }
  };

  render() {
    return (
      <div>
        <div id="profileEditDiv">
          <h2 id="profileEditHeading">Edit a Board Entry</h2>
          {/* <FormControl style={{ width: "50%", backgroundColor: "#FFFFFF" }}> */}
          <div>
            <TextField
              label="Board Title"
              variant="outlined"
              type="text"
              value={this.state.title}
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
            />
            <TextField
              label="Board Image"
              variant="outlined"
              type="text"
              value={this.state.picture}
              onChange={(e) => {
                this.setState({ picture: e.target.value });
              }}
            />
          </div>
          <TextField
            id="outlined-textarea"
            label="Board Details"
            type="text"
            value={this.state.details}
            multiline
            variant="outlined"
            onChange={(e) => {
              this.setState({ details: e.target.value });
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="contained"
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              <Link style={{ color: "#000000" }} to="/admin/profileList">
                <EditIcon />
                  Edit a Board Item
                </Link>
            </Button>
            <Link to="/admin/profileList">
              <Button
                variant="outlined"
                color="primary"
                value={this.state.profId}
                onClick={(e) => {
                  this.handleDelete(this.state.profId);
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
