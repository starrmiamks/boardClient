import React, { Component } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { UserDetails } from '../../Interfaces';
import { Edit as EditIcon } from '@material-ui/icons';


type AcceptedProps = {
    sessionToken: string | null;
    userId: number;
    updateUserId: (newUserId: number) => void;
};

type UserDataState = {
    userData: UserDetails[];
    results: UserDetails;
};
const styles = {
    table: {
        minWidth: 650,
    },
};

export class AdminUserTable extends Component<AcceptedProps, UserDataState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            userData: [],
            results: {
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                isAdmin: 'false',
            },
        };
    }
    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        if (this.props.sessionToken) {
            console.log('Before Admin User Table Fetch');
            fetch('http://localhost:3000/user/all', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => res.json())
                .then((data: UserDetails[]) => {
                    this.setState({ userData: data });
                })
                .then(() => {
                    if (this.state.userData !== null) {
                        console.log(this.state.userData);
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    deleteUser = (user: any) => {
        fetch(`http://localhost:3000/user/${user.this.state.results.id}`, {
            method: 'DELETE',
            headers: new Headers({ 'Content-Type': 'application/json'}),
        }).then(() => this.fetchUsers());
    };

    userMapper = () => {
        return this.state.userData.map((users: UserDetails, index) => {
            return (
                <TableRow key={index}>
                    <TableCell component='th' scope='row'>
                        {users.id}
                    </TableCell>
                    <TableCell align='right'>{users.firstName}</TableCell>
                    <TableCell align='right'>{users.lastName}</TableCell>
                    <TableCell align='right'>{users.email}</TableCell>
                    <TableCell align='right'>{users.isAdmin}</TableCell>
                    <TableCell align='right'>
                        <Link to='/admin/edit'>
                            <Button
                                type="submit"
                                value='userData.id'
                                onClick={(e) => {
                                    this.props.updateUserId(users.id);
                                }}
                            >
                                <EditIcon />
                                Edit
                            </Button>
                        </Link>
                    </TableCell>
                </TableRow>
            );
        })
    };

    render() {
        return (
            <div>
                <h3>User Table</h3>
                <TableContainer component={Paper}>
                    <Table style={styles.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='right'>id</TableCell>
                                <TableCell align='right'>First Name</TableCell>
                                <TableCell align='right'>Last Name</TableCell>
                                <TableCell align='right'>email</TableCell>
                                <TableCell align='right'>Admin?</TableCell>
                                <TableCell align='right'></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.userMapper()}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default AdminUserTable;

