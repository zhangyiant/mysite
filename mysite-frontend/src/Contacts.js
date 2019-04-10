import React, { Component } from 'react';
import axios from 'axios';
import ContactRow from './ContactRow';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            isCreateInputShown: false,
            newName: '',
            newGender: ''
        }
        this.handleNewClick = this.handleNewClick.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);

        this.handleNewNameChange = this.handleNewNameChange.bind(this);
        this.handleNewGenderChange = this.handleNewGenderChange.bind(this);

        this.handleAfterDelete = this.handleAfterDelete.bind(this);
        this.handleAfterModify = this.handleAfterModify.bind(this);
    }
    handleNewClick() {
        this.setState({
            newName: '',
            newGender: '',
            isCreateInputShown: true
        });
    }
    handleConfirmClick() {
        const name = this.state.newName;
        const gender = this.state.newGender;
        this.setState({
            isCreateInputShown: false
        });
        axios.post('/api/contact/', {
            name,
            gender})
        .then((response) => {
            axios.get('/api/contact/')
            .then(res => {
                const contacts = res.data;
                this.setState({ contacts });
            });
        });
    }
    handleCancelClick() {
        this.setState({
            isCreateInputShown: false
        });
    }
    handleNewNameChange(event) {
        this.setState({
            newName: event.target.value
        });
    }
    handleNewGenderChange(event) {
        this.setState({
            newGender: event.target.value
        });
    }
    handleAfterDelete(contactId) {
        this.refreshContacts();
    }
    handleAfterModify(contactId) {
        this.refreshContacts();
    }
    componentDidMount() {
        this.refreshContacts();
    }
    refreshContacts() {
        axios.get('/api/contact/')
            .then(res => {
                const contacts = res.data;
                this.setState({ contacts });
            });
    }
    render() {
        const isCreateInputShown = this.state.isCreateInputShown;
        let buttons = null;
        let newInputs = null;
        if (isCreateInputShown) {
            buttons = (
                <span>
                    <button onClick={ this.handleConfirmClick }>
                        确定
                    </button>
                    <button onClick={ this.handleCancelClick }>
                        取消
                    </button>
                </span>
            );
            newInputs = (
                <tr>
                    <td>
                        <input type="text" value={this.state.newName} onChange={this.handleNewNameChange} />
                    </td>
                    <td>
                        <input type="text" value={this.state.newGender} onChange={this.handleNewGenderChange} />
                    </td>
                </tr>
            );
        } else {
            buttons = (
                <button onClick={ this.handleNewClick }>
                    新建
                </button>);
        }
        return (
            <div>
                <table>
                    <tr>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>电话号码</th>
                        <th>操作</th>
                    </tr>
                    { this.state.contacts.map(contact =>
                        <ContactRow
                            contact={contact}
                            onAfterDelete={this.handleAfterDelete}
                            onAfterModify={this.handleAfterModify}
                        />)
                    }
                    {newInputs}
                </table>
                { buttons }
            </div>);
    }
}

export default Contacts;
