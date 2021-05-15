import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Toolbar } from "@material-ui/core";

type AcceptedProps = {
  clearUser: () => void;
  sessionToken: string | null;
  email: string | null | undefined;
};

export class Navbar extends Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {};
    console.log(props);
  }
  render() {
    return (
      <div className="mainNav">
        <div id="navContainer"></div>
        {/* <h3>User Navbar</h3> */}
        {/* <h3>Welcome {this.props.email}</h3> */}
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Button style={{ margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/profile/mine">
              {" "}
              My Boards
            </Link>
          </Button>
          <Button style={{ margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/profile/add">
              {" "}
              Add a Board
            </Link>
          </Button>
          <Button style={{ margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/subscription/signup">
              Subscribe
            </Link>
          </Button>
          <Button style={{ margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/user/edit">
              Edit my Acct
            </Link>
          </Button>
          <Button
            style={{ margin: "1rem 3rem" }}
            onClick={this.props.clearUser}
          >
            <Link style={{ color: "#000000" }} to="/home">
              Logout
            </Link>
          </Button>
          {console.log("Nav Footer")}
        </Toolbar>
      </div>
    );
  }
}
export default Navbar;
