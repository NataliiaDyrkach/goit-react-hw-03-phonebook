import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({contacts: JSON.parse(localData)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    // 'name' & 'number' from input ContactForm
    const newContact = { id: nanoid(), name, number };
    const { contacts } = this.state;

    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts!`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  deleteContact = id => {
    this.setState(preventState => ({
      contacts: preventState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = event => {
    // console.log(event.currentTarget.value);
    this.setState({ filter: event.currentTarget.value });
  };

  filterdContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <div>
        <h1 className={css.text}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={css.text}>Contacts</h2>
        <p className={css.text}>Find contacts by name</p>
        <Filter changeFilter={this.changeFilter} filter={this.state.filter} />
        <ContactList
          onDeleteContact={this.deleteContact}
          contacts={this.filterdContact()}
        />
      </div>
    );
  }
}

export default App;
