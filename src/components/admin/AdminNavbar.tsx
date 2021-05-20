import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Toolbar } from "@material-ui/core";

type ValueTypes = {};
type AcceptedProps = {
    clearUser: () => void;
    sessionToken: string | null;
    email: string | null | undefined;
};

export class AdminNavbar extends Component<AcceptedProps, ValueTypes> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div id='adminContainer'>
                    <div style={{ display: 'block', justifyContent: 'flext-start'}} className='header'>
                        {/* <h3 className='header'>AdminNavbar</h3> */}
                        {/* <h3>Welcome {this.props.email}</h3> */}
                        <h5>What would you like to manage?</h5>
                    </div>
                </div>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button style={{ margin: '1rem 3rem' }}>
                        <Link style={{ color: '#000000' }} to='/admin/home' >Admin Home</Link>
                    </Button>
                    <Button style={{ margin: '1rem 3rem' }}>
                        <Link style={{ color: '#0000000' }} to='/admin/userTable'>
                            User Management
                    </Link>
                    </Button>
                    <Button style={{ margin: '1rem 3rem' }}>
                        <Link style={{ color: '#000000'}} to='/admin/entries'>
                            Profile Entries
                    </Link>
                    </Button>
                    <Button style={{ margin: '1rem 3rem' }}>
                        <Link style={{ color: '#000000' }} to='/admin/subscriptions'>
                            Subscriptions
                    </Link>
                    </Button>
                    <Button style={{ margin: '1rem 3rem'}} onClick={this.props.clearUser}>
                        <Link style={{ color: '#000000' }} to='/user/register'>
                            Logout
                    </Link>
                    </Button>
                    {console.log('Admin Nav Footer')}
                </Toolbar>
            </div>
        );
    }
}

export default AdminNavbar;