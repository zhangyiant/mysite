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
            isCreateInputShown: false
        }
        this.handleNewClick = this.handleNewClick.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }
    handleNewClick() {
        this.setState({
            isCreateInputShown: true
        });
    }
    handleConfirmClick() {
        this.setState({
            isCreateInputShown: false
        });
     }
    handleCancelClick() {
        this.setState({
            isCreateInputShown: false
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
