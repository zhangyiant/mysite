import React, { Component } from 'react';
import axios from 'axios';


class DetailedContact extends Component {
    state = {
        contact: null
    }
    componentDidMount() {
        axios.get(`/myfirstapp/api/contact/${this.props.match.params.id}/`)
            .then(res => {
                const contact = res.data;
                this.setState({ contact });
            });
    }
    render() {
        const contact = this.state.contact;
        if (!contact) {
            return null;
        }
        return (
            <div>
                <h1>{ contact.name }</h1>
                <h2>{ contact.gender }</h2>
                <ol>
                    { contact.phoneNumbers.map(phoneNumber =>
                        <li>{ phoneNumber }</li>)
                    }
                </ol>
            </div>);
    }
}
export default DetailedContact;
