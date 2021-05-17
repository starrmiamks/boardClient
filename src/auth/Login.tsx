import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

type AcceptedProps = {
    updateSessionToken: (newToken: string) => void;
    updateUserRole: (newUserRole: string) => void;
};

type UserState = {
    email: String;
    password: String;
};

export class Login extends Component<AcceptedProps, UserState>{
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = (e: any) => {
        if (this.state.email !== "" && this.state.password !== "") {
            e.preventDefault();
            fetch('http://localhost:3000/user/login', {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    user: {
                        email: this.state.email,
                        password: this.state.password,
                    }
                }),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw new Error("Invalid login information")
                    } else return res.json();
                })
                .then((data) => {
                    this.props.updateSessionToken(data.sessionToken);
                    this.props.updateUserRole(data.user.admin);
                    console.log("User successfully logged in!");
                })
                .catch((err) => alert(err));
        } else {
            alert("Email and password required");
        }
    };
    handleEmailChange = (event: any) => {
        const email = event.target.value;
        this.setState({ email: email });
    };
    handlePasswordChange = (event: any) => {
        const password = event.target.value;
        this.setState({ password: password });
    };

    render() {
        return (
            <div id='loginDiv'>
                <h2 id='login'>Login</h2>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={(errors) => console.log(errors)}
                >
                    <TextValidator 
                        label="email"
                        onChange={this.handleEmailChange}
                        name="email"
                        type="text"
                        value={this.state.email}
                        validators={["required"]}
                        errorMessages={["required field"]}
                        autoComplete="off"
                    />
                    <TextValidator
                        label="password"
                        onChange={this.handlePasswordChange}
                        name="password"
                        type="password"
                        validators={["minStringLength:5", "required"]}
                        errorMessages={["required field"]}
                        value={this.state.password}
                    />
                    <br />
                    <Button variant="outlined" onClick={this.handleSubmit}>
                        Login
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}