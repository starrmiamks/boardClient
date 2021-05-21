import React, { Component } from "react";
// import APIURL from "../../helpers/environment";
// import { FormControl, TextField, Button } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

type AcceptedProps = {
  sessionToken: string | null;
};
type SubscriptionState = {
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  zip: string;
  userId: number;
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default class SubscriptionCreate extends Component<
  AcceptedProps,
  SubscriptionState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zip: "",
      userId: 0,
    };
  }

  handleSubmit = (event: any) => {
    if (this.props.sessionToken) {
      console.log("Before SubscriptionCreate Fetch");
      event.preventDefault();
      fetch('http://localhost:3000/subscription/signup', {
        method: "POST",
        body: JSON.stringify({
          subscription: {
            streetAddress1: this.state.streetAddress1,
            streetAddress2: this.state.streetAddress2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            userId: this.state.userId,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          'Authorization': this.props.sessionToken,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <div id="subscriptionCreateDiv">
          <h3 id="subscriptionHeading">Subscribe Today!</h3>
          <h3 id='subscriptionText'>Receive a custom curated board box each month.</h3>
          <h4 id='subscriptionText'>$39.95</h4>
          {/* <FormControl style={{ backgroundColor: "#FFFFFF" }}> */}
          {/* <Card>
            <CardContent> */}
              <div>
                <TextField
                  label="Street Address 1"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    this.setState({ streetAddress1: e.target.value });
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Street Address 2"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    this.setState({ streetAddress2: e.target.value });
                  }}
                />
              </div>
              <div>
                <TextField
                  label="City"
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ city: e.target.value });
                  }}
                />
                </div>
                <div>
                <TextField
                  label="State"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    this.setState({ state: e.target.value });
                  }}
                />
                </div>
                <div>
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    this.setState({ zip: e.target.value });
                  }}
                />
                
              </div>
              <Button
                variant="contained"
                onClick={(e) => {
                  this.handleSubmit(e);
                }}
              >
                <Link style={{ color: "#000000" }} to="/subscription/mine">
                  Sign up!
              </Link>
              </Button>
              {/* </FormControl> */}
            {/* </CardContent>
          </Card> */}
        </div>
      </div>
    );
  }
}
