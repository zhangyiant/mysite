import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DetailedContact from './DetailedContact';

class ContactRow extends Component {
    render() {
        const contact = this.props.contact;
        return (
            <tr>
                <td>
                    <Link to={`/contact/${contact.id}`}>
                        { contact.name }
                    </Link>
                </td>
                <td>{ contact.gender }</td>
                <td>
                    <ol>
                        { contact.phoneNumbers.map(phoneNumber=>
                            <li>{ phoneNumber }</li>)
                        }
                    </ol>
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
    componentDidMount() {
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
                    </tr>
                    { this.state.contacts.map(contact =>
                        <ContactRow contact={ contact } />)
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
