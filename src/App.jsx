import { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import ContactForm from "components/ContactForm/ContactForm"
import ContactList from "components/ContactList/ContactList"
import Filter from "components/Filter/Filter"

export function App() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState("");
  const one = useRef(true);

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem("contacts")) ?
      JSON.parse(localStorage.getItem("contacts")) :
      [])
  }, [])

  useEffect(() => {
    if (one.current) {
      one.current = false;
      return;
    }
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts])

  const addContact = (data) => {
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} already exists`)
      return;
    }
    setContacts((prev) => {
      const contact = {
        id: nanoid(),
        name: data.name,
        number: data.number
      }
      return [...prev, contact]
    })
  }

  function getFilteredContacts() {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
  }

  const filterContacts = (e) => {
    setFilter(e.target.value)
  }

  const remove = (name) => {
    setContacts((prev) => prev.filter(contact => contact.name !== name))
  }

  const data = getFilteredContacts()
  return (
    <div className="app">
      <div className="phone-book">
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={addContact}
        />
        <h2>Contacts</h2>
        <Filter
          onChange={filterContacts}
          value={filter} />
        <ContactList
          contacts={data}
          onClick={remove}
        />
      </div>
    </div >
  )

}
