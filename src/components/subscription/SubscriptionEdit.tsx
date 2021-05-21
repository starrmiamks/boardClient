import React, { Component } from 'react';
// import APIURL from '../../helpers/environment';
// import { FormControl, TextField, Button } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import EditIcon from '@material-ui/icons/Edit';
import { SubscriptionDetails } from '../../Interfaces';
// import DeleteIcon from '@material-ui/icons/Delete';
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
};

export class SubscriptionEdit extends Component<AcceptedProps, SubscriptionDataState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      subId: 0,
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zip: '',
      subscriptionData: [
        {
          id: 0,
          streetAddress1: '',
          streetAddress2: '',
          city: '',
          state: '',
          zip: '',
        },
      ],

      results: {
        id: 0,
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        state: '',
        zip: '',
      },
    };
  }
  componentDidMount() {
    this.fetchSubscription();
    console.log('SubscriptionEdit Props', this.props);
  }
  fetchSubscription = () => {
    if (this.props.sessionToken) {
      console.log('Before SubscriptionEdit Fetch');
      fetch('http://localhost:3000/subscription/mine', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          this.setState({ streetAddress1: results.streetAddress1 });
          this.setState({ streetAddress2: results.streetAddress2 });
          this.setState({ city: results.city });
          this.setState({ state: results.state });
          this.setState({ zip: results.zip });
          console.log('Record Id from SubscriptionEdit', results.id);
        })
        .catch((err) => console.log(err));
    }
  };

  handleSubmit = (event: any) => {
    console.log('Before SubscriptionEdit Submit');
    if (this.props.sessionToken) {
      event.preventDefault();
      fetch(`http://localhost:3000/subscription/update/${this.props.subscriptionId}`, {
        method: 'PUT',
        body: JSON.stringify({
          streetAddress1: this.state.streetAddress1,
          streetAddress2: this.state.streetAddress2,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.sessionToken,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };

  handleDelete = (id: number) => {
    if (this.props.sessionToken) {
      fetch(`http://localhost:3000/subscription/delete/${this.props.subscriptionId}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
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
        <div id='subscriptionEditDiv'>
          <h3 id='subscriptionEditHeading'>Edit Your Subscription</h3>
          {/* <FormControl style={{ backgroundColor: '#FFFFFF' }}> */}
          <div>
            <TextField
              label='Street Address 1'
              variant='outlined'
              type='text'
              value={this.state.streetAddress1}
              onChange={(e) => {
                this.setState({ streetAddress1: e.target.value });
              }}
              />
              </div>
              <div>
            <TextField
              label='Street Address 2'
              variant='outlined'
              type='text'
              value={this.state.streetAddress2}
              onChange={(e) => {
                this.setState({ streetAddress2: e.target.value });
              }}
              />
              </div>
            <div>
              <TextField
                label='City'
                variant='outlined'
                type='text'
                value={this.state.city}
                onChange={(e) => {
                  this.setState({ city: e.target.value });
                }}
              />
              </div>
              <div>
              <TextField
                label='State'
                variant='outlined'
                type='text'
                value={this.state.state}
                onChange={(e) => {
                  this.setState({ state: e.target.value });
                }}
              />
              </div>
              <div>
              <TextField
                label='Zip Code'
                variant='outlined'
                type='text'
                value={this.state.zip}
                onChange={(e) => {
                  this.setState({ zip: e.target.value });
                }}
              />
            </div>
            <div
              style={{
                color: '#000000',
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                variant='contained'
                onClick={(e) => {
                  this.handleSubmit(e);
                }}
              >
                <EditIcon />
                <Link style={{ color: '#000000' }} to='/subscription/mine'>
                  Update
                </Link>
              </Button>
            </div>
            <div>
              <Link style={{ color: '#000000' }} to='/subscription/mine'>
                <Button
                  variant='contained'
                  value={this.state.subId}
                  onClick={(e) => {
                    this.handleDelete(this.state.subId);
                  }}
                >
                  <DeleteIcon />
                  Delete Subscription
                </Button>
              </Link>
            </div>
          {/* </FormControl> */}
        </div>
      </div>
    );
  }
}
export default SubscriptionEdit;
