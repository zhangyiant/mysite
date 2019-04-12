import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

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
                        { contact.phoneNumbers.map(
                            (phoneNumber, index)=>
                                <li key={index}>{ phoneNumber }</li>)
                        }
                    </ol>
                </td>
                <td>
                    {operationCell}
                </td>
            </tr>
        );
    }
}
export default ContactRow;
