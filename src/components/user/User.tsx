import React, { Component } from 'react';

type AcceptedProps = {};
export class User extends Component<AcceptedProps, {}> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {};
        console.log(props);
    }
    render() {
        return (
            <div style={{ width: '50%', display: 'block' }}>
                <h5> User functionality:</h5>
                <ul>
                    <li>Subscribe</li>
                    <li>Add, edit and view profile entries</li>
                    <li>See all profile entries</li>
                </ul>
            </div>
        );
    }
}
export default User;