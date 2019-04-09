import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DetailedContact from './DetailedContact';

class ContactRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModifying: false,
            newName: '',
            newGender: ''
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleModifyClick = this.handleModifyClick.bind(this);
        this.handleNewNameChange = this.handleNewNameChange.bind(this);
        this.handleNewGenderChange = this.handleNewGenderChange.bind(this);

        this.handleConfirmClick = this.handleConfirmClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }
    handleConfirmClick() {
        const name = this.state.newName;
        const gender = this.state.newGender;
        axios.put(`/api/contact/${this.props.contact.id}/`, {
            name,
            gender})
        .then((response) => {
            this.props.onAfterModify(this.props.contact.id);
        });
        this.setState({isModifying: false});
    }
    handleCancelClick() {
        this.setState({isModifying: false});
    }
    handleDeleteClick(e) {
        axios.delete(`/api/contact/${this.props.contact.id}/`)
        .then(resp => {
            this.props.onAfterDelete(this.props.contact.id);
        });
    }
    handleModifyClick() {
        this.setState(
            {
                isModifying: true,
                newName: this.props.contact.name,
                newGender: this.props.contact.gender
            }
        );
        return;
    }
    handleNewNameChange(event) {
        this.setState({
            newName: event.target.value
        });
        return;
    }
    handleNewGenderChange(event) {
        this.setState({
            newGender: event.target.value
        });
        return;
    }
    render() {
        const contact = this.props.contact;
        const isModifying = this.state.isModifying;
        let nameCell;
        let genderCell;
        let operationCell;
        if (isModifying) {
            nameCell = (
                <input type="text" value={this.state.newName} onChange={this.handleNewNameChange} />);
        } else {
            nameCell = (
                <Link to={`/contact/${contact.id}`}>
                    { contact.name }
                </Link>);
        }
        if (isModifying) {
            genderCell = (
                <input type="text" value={this.state.newGender} onChange={this.handleNewGenderChange} />);
        } else {
            genderCell = (
                <span>{contact.gender}</span>
            );
        }
        if (isModifying) {
            operationCell = (
                <span>
                    <button onClick={this.handleConfirmClick}>
                        确定
                    </button>
                    <button onClick={this.handleCancelClick}>
                        取消
                    </button>
                </span>);
        } else {
            operationCell = (
                <span>
                    <button onClick={this.handleModifyClick}>
                        修改
                    </button>
                    <button onClick={this.handleDeleteClick}>
                        删除
                    </button>
                </span>);
        }
        return (
            <tr>
                <td>
                    {nameCell}
                </td>
                <td>
                    {genderCell}
                </td>
                <td>
                    <ol>
                        { contact.phoneNumbers.map(phoneNumber=>
                            <li>{ phoneNumber }</li>)
                        }
                    </ol>
                </td>
                    {operationCell}
                <td>
                </td>
            </tr>
        );
    }
}

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


class App extends Component {
  render() {
    return (
        <Router>
            <Route path="/" exact component={ Contacts } />
            <Route path="/contact/:id" component={ DetailedContact } />
        </Router>
    );
  }
}

export default App;
