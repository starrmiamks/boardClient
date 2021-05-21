import React, { Component } from "react";
// import APIURL from "../../helpers/environment";
import { ProfileDetails } from "../../Interfaces";
// import { ProfileEdit } from './ProfileEdit';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

type AcceptedProps = {
  sessionToken: string | null;
};

type ProfileDataState = {
  profileData: ProfileDetails[];
  results: ProfileDetails;
};
const styles = {
  table: {
    minWidth: 650,
  },
};

export default class ProfileTable extends Component<
  AcceptedProps,
  ProfileDataState
> {
  constructor(props: AcceptedProps) {
    super(props);
    //   console.log(props),
    this.state = {
      profileData: [],
      results: {
        id: 0,
        title: "",
        picture: "",
        details: "",
      },
    };
  }
  componentDidMount() {
    this.fetchProfiles();
  }
  fetchProfiles = () => {
    console.log("Before Profile Table Fetch");
    if (this.props.sessionToken) {
      fetch('http://localhost:3000/profile/mine', {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((data: ProfileDetails[]) => {
          this.setState({ profileData: data });
        })
        .then(() => {
          if (this.state.profileData !== null) {
            console.log(this.state.profileData);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  profileMapper = () => {
    return this.state.profileData.map((profiles: ProfileDetails, index) => {
      return (
        <TableRow key={index}>
          {/* <TableCell component="th" scope="row">{profiles.id}{" "}</TableCell> */}
          <TableCell align="center">{profiles.title}</TableCell>
          <TableCell align="center">{profiles.picture}</TableCell>
          <TableCell align="center">{profiles.details}</TableCell>
        </TableRow>
      );
    });
  };

  handleDelete = (id: number) => {
    if (this.props.sessionToken) {
      fetch(`http://localhost:3000/profile/delete/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => {
          this.fetchProfiles();
        })
        .catch((err) => alert(err));
    }
  };

  render() {
    return (
      <div>
        <h3>Current Boards</h3>
        <TableContainer component={Paper}>
          <Table style={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow id='table'>
                {/* <TableCell align="center">id</TableCell> */}
                <TableCell align="center">Board Title</TableCell>
                <TableCell align="center">Board Image Link</TableCell>
                <TableCell align="center">Board Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.profileMapper()}</TableBody>
          </Table>
        </TableContainer>
        {/* <ProfileEdit /> */}
      </div>
    );
  }
}
