import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchContacts = () => {
    axios.get("https://jsmern-phonebook.onrender.com/contacts").then(res => setContacts(res.data));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = (e) => {
  e.preventDefault();

  if (name.trim() === "" || phone.trim() === "") {
    alert("Name and Phone are required.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Phone must be exactly 10 digits.");
    return;
  }

  if (contacts.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    alert("This name already exists.");
    return;
  }

  axios.post("https://jsmern-phonebook.onrender.com/contacts", { name, phone }).then(() => {
    alert("Contact added!");
    setName("");
    setPhone("");
    fetchContacts();
  });
};


const handleDelete = (name) => {
  const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

  if (confirmDelete) {
    axios.delete(`https://jsmern-phonebook.onrender.com/contacts/${name}`).then(() => {
      alert("Deleted successfully!");
      fetchContacts();
    });
  }
};

  return (
    <div className="container">
      <h1>📞 Phone Book</h1>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="10-digit Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <p className="message">{msg}</p>

      <h2>Contacts</h2>
      <ul>
        {contacts.map((c, i) => (
          <li key={i}>
            {c.name} - {c.phone}
            <button onClick={() => handleDelete(c.name)} style={{ marginLeft: "10px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contact;
