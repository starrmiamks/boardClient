import React, { Component } from "react";
// import APIURL from "../../helpers/environment";
import { SubscriptionDetails } from "../../Interfaces";

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
  subscriptionId: number;
  updateSubscriptionId: (newGroceryId: number) => void;
};

type SubscriptionDataState = {
  subscriptionData: SubscriptionDetails[];
  results: SubscriptionDetails;
};
const styles = {
  table: {
    minWidth: 650,
  },
};

export default class SubscriptionTable extends Component<
  AcceptedProps,
  SubscriptionDataState
> {
  constructor(props: AcceptedProps) {
    super(props);
    //   console.log(props),
    this.state = {
      subscriptionData: [],
      results: {
        id: 0,
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        zip: "",
      },
    };
  }
  componentDidMount() {
    this.fetchSubscriptions();
  }
  fetchSubscriptions = () => {
    console.log("Before Subscription Table Fetch");
    if (this.props.sessionToken) {
      fetch('http://localhost:3000/subscription/mine', {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((data: SubscriptionDetails[]) => {
          this.setState({ subscriptionData: data });
        })
        .then(() => {
          if (this.state.subscriptionData !== null) {
            console.log(this.state.subscriptionData);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  subscriptionMapper = () => {
    return this.state.subscriptionData.map((subscriptions: SubscriptionDetails, index) => {
      return (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            {subscriptions.id}{" "}
          </TableCell>
          <TableCell align="right">{subscriptions.streetAddress1}</TableCell>
          <TableCell align="right">{subscriptions.streetAddress2}</TableCell>
          <TableCell align="right">{subscriptions.city}</TableCell>
          <TableCell align="right">{subscriptions.state}</TableCell>
          <TableCell align="right">{subscriptions.zip}</TableCell>
        </TableRow>
      );
    });
  };

  handleDelete = (id: number) => {
    if (this.props.sessionToken) {
      fetch(`http://localhost:3000/subscription/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => {
          this.fetchSubscriptions();
        })
        .catch((err) => alert(err));
    }
  };

  render() {
    return (
      <div>
        <h3>Subscription Table</h3>
        <TableContainer component={Paper}>
          <Table style={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">Street Address 1</TableCell>
                <TableCell align="right">Street Address 2</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">State</TableCell>
                <TableCell align="right">Zip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.subscriptionMapper()}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
