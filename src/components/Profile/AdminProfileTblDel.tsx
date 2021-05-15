import React, { Component } from "react";
// import APIURL from "../../helpers/environment";
import { Link } from "react-router-dom";
import { ProfileDetails } from "../../Interfaces";
import {
  Button,
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
  profileId: number;
  updateProfileId: (newProfileId: number) => void;
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

export default class AdminProfileTblDel extends Component<
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
      fetch(`http://localhost:3000/profile/`, {
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
          <TableCell component="th" scope="row">
            {profiles.id}{" "}
          </TableCell>
          <TableCell align="right">{profiles.title}</TableCell>
          <TableCell align="right">{profiles.picture}</TableCell>
          <TableCell align="right">{profiles.details}</TableCell>
          <TableCell align="right">
            <Link style={{ color: "#000000" }} to="/admin/profileEdit">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={(e) => {
                  this.props.updateProfileId(profiles.id);
                }}
              >
                Edit
              </Button>
            </Link>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Profile Table</h3>
        <TableContainer component={Paper}>
          <Table style={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">Board Title</TableCell>
                <TableCell align="right">Board Image</TableCell>
                <TableCell align="right">Board Details</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.profileMapper()}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
