import { useState } from 'react';

import Layout from './components/Layout/Layout';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

import useLocalStorage from './hooks/useLocalStorage';

import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (text, number) => {
    const contact = {
      name: text,
      number,
      id: uuidv4(),
    };

    const isExistedName = contacts.find(
      contact => contact.name.toLowerCase() === text.toLowerCase(),
    );
    if (isExistedName) {
      alert(text + ' is already in your contacts');
      return;
    }

    setContacts(prev => [contact, ...prev]);
  };

  const deleteContact = contactId => {
    setContacts(prev => {
      return prev.filter(contact => contact.id !== contactId);
    });
  };

  const handleFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    return filteredContacts;
  };

  return (
    <Layout>
      <h1>PhoneBook</h1>
      <Form onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        data={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </Layout>
  );
}