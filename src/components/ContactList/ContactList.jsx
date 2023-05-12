import PropTypes from 'prop-types';
import css from './ContactList.module.css'

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            <p>{name}:</p>
            <p>{number}</p>
            <button className={css.button} type="button" onClick={() => onDeleteContact(id)}>
              Delite
            </button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
