import React from 'react'
import { useState } from 'react';
import { nanoid } from 'nanoid';
import './crud.css';
import data from './mock_data.json'


const Crud = () => {
    const [contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData] = useState({
        fullName:"",
        address:"",
        phoneNumber:"",
        email:""
    })

    const handleAddFormChange = (event) =>{
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData)
    };

    const handleAddFormSubmit = (event) =>{
        event.preventDefault();

        const newContact = {
            id:nanoid(),
            fullName: addFormData.fieldName,
            address:addFormData.address,
            phoneNumber:addFormData.phoneNumber,
            email:addFormData.email
        };

        const newContacts = [...contacts]

    }




    return (
        <div className="app-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr>
                            <td>{contact.fullName}</td>
                            <td>{contact.address}</td>
                            <td>{contact.phoneNumber}</td>
                            <td>{contact.email}</td>
                        </tr>))}
                </tbody>
            </table>

            <h2>Add a contact</h2>
            <form>
                <input type="text"
                    name='fullname'
                    required='required'
                    placeholder='Enter a name ...'
                    onChange={handleAddFormChange}
                />
                <input type="text"
                    name='address'
                    required='required'
                    placeholder='Enter the address ...'
                    onChange={handleAddFormChange}
                />
                <input type="text"
                    name='phone number'
                    required='required'
                    placeholder='Enter the phone number ...'
                    onChange={handleAddFormChange}
                />
                <input type="email"
                    name='Email'
                    required='required'
                    placeholder='Enter the Email ...'
                    onChange={handleAddFormChange}
                />

                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default Crud