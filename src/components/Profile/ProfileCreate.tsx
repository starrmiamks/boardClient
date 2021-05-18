import React, { Component } from 'react';
// import { FormControl, TextField, Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { ImageUploader } from './ImageUploader'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


type AcceptedProps = {
    sessionToken: string | null;
};
type ProfileState = {
    title: string;
    picture: string;
    details: string;
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

const styles = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
};

export default class ProfileCreate extends Component<AcceptedProps, ProfileState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            title: '',
            picture: '',
            details: '',
            userId: 0,
        };
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        if (this.props.sessionToken) {
            console.log('Before ProfileCreate Fetch');
            fetch('http://localhost:3000/profile/add', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                }),
                body: JSON.stringify({
                    user: {
                        title: this.state.title,
                        picture: this.state.picture,
                        details: this.state.details,
                        userId: this.state.userId,
                    }
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => console.log(err));
        } else {
            console.log("that didn't work");
        }
    };

    render() {
        return (
            <div>
                <div id='profileCreateDiv'>
                    <h3 id='profileHeading'>Add a Board</h3>
                    <FormControl style={{ backgroundColor: '#FFFFFF' }}>
                        <div className='picture'>
                            <TextField
                                label="Board Name"
                                variant="outlined"
                                type='text'
                                onChange={(e) => {
                                    this.setState({ title: e.target.value });
                                }}
                            />
                            {/* <ImageUploader /> */}
                            <TextField
                                label="Upload Image"
                                variant='outlined'
                                type='text'
                                onChange={(e) => {
                                    this.setState({ picture: e.target.value });
                                }}
                            />
                            <TextField
                                id='outlined-textarea'
                                label='Details'
                                type='text'
                                multiline
                                variant='outlined'
                                onChange={(e) => {
                                    this.setState({ details: e.target.value });
                                }}
                            />
                            <CardActions>
                                <Link to='/profile/mine'>
                                    <Button variant='contained' onClick={(e) => { this.handleSubmit(e) }}>Add Board</Button>
                                </Link>
                            </CardActions>
                        </div>
                    </FormControl>
                </div>
            </div>
        );
    }
}

