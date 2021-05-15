import React, { Component } from 'react';
import { Button } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from 'react-router-dom';
import { UserDetails } from '../../Interfaces';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

type AcceptedProps = {
    clearUser: () => void;
    sessionToken: any;
};
type UserDataState = {
    editId: number;
    editFirstName: string;
    editLastName: string;
    editEmail: string;
    editPassword: string;
    userData: UserDetails[];
    results: UserDetails;
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

export class UserEdit extends Component<AcceptedProps, UserDataState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            editId: 0,
            editFirstName: '',
            editLastName: '',
            editEmail: '',
            editPassword: '',
            userData: [],
            results: {
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                admin: '',
            },
        };
        console.log('UserEdit: ', this.props.sessionToken);
    }

    fetchUser = () => {
        console.log('Before User Fetch', this.props.sessionToken);
        if (this.props.sessionToken) {
            fetch('http://localhost:3000/user/', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => res.json())
                .then((results) => {
                    this.setState({ editId: results.id });
                    this.setState({ editFirstName: results.firstName });
                    this.setState({ editLastName: results.firstName });
                    this.setState({ editEmail: results.email });
                    this.setState({ editPassword: results.psswored });
                    console.log('UserEdit Fetch', results.id);
                })
                .catch((err) => console.log(err));
        }
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/', {
            method: 'PUT',
            body: JSON.stringify({
                user: {
                    id: this.state.editId,
                    firstName: this.state.editFirstName,
                    lastName: this.state.editLastName,
                    email: this.state.editEmail,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: this.props.sessionToken,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };
    handleSubmitPassword = (event: any) => {
        event.preventDefault();

        fetch('http://localhost:3000/user/', {
            method: 'PUT',
            body: JSON.stringify({
                user: {
                    password: this.state.editPassword,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: this.props.sessionToken,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };
    handleDelete = (id: number) => {
        if (this.props.sessionToken) {
            fetch(`http://localhost:3000/user/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => {
                    this.fetchUser();
                    this.props.clearUser();
                })
                .catch((err) => alert(err));
        }
    };

    handleFirstNameChange = (event: any) => {
        const firstName = event.target.value;
        this.setState({ editFirstName: firstName });
    };
    handleLastNameChange = (event: any) => {
        const lastName = event.target.value;
        this.setState({ editLastName: lastName });
    };
    handleEmailChange = (event: any) => {
        const email = event.target.value;
        this.setState({ editEmail: email });
    };

    componentDidMount() {
        this.fetchUser();
    }
    render() {
        return (
            <div>
                <h3>Edit your account</h3>
                <Card>
                    <CardContent>
                        <ValidatorForm
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '40%',
                                display: 'block',
                            }}
                            ref='form'
                            onSubmit={this.handleSubmit}
                            onError={(errors) => console.log(errors)}
                        >
                            <TextValidator
                                label='First Name'
                                onChange={this.handleFirstNameChange}
                                name='First Name'
                                value={this.state.editFirstName}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                            <TextValidator
                                label='Last Name'
                                onChange={(e) => this.handleLastNameChange(e)}
                                name='Last Name'
                                value={this.state.editLastName}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                            <TextValidator
                                label='Email'
                                onChange={(e) => this.handleEmailChange}
                                name="Email"
                                value={this.state.editEmail}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />

                            <br />
                            <div>
                                <Button
                                    variant='contained'
                                    // color='primary'
                                    onClick={(e) => {
                                        this.handleSubmit(e);
                                        console.log(`
                                    id: ${this.state.editId},
                                    firstName: ${this.state.editFirstName},
                                    lastName: ${this.state.editLastName},
                                    email: ${this.state.editEmail},
                                    password: ${this.state.editPassword},
                                    `);
                                    }}
                                >
                                    <Link to='/user/edit'>
                                        <EditIcon />
                                Edit
                            </Link>
                                </Button>
                                <Link to='/user/edit'>
                                    <Button
                                        variant='contained'
                                        // color='primary'
                                        value={this.state.editId}
                                        onClick={(e) => { this.handleDelete(this.state.editId) }}
                                    >
                                        <DeleteIcon />
                                Delete
                            </Button>
                                </Link>
                            </div>
                        </ValidatorForm>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default UserEdit;