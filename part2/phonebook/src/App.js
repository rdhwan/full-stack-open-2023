import { useEffect, useState } from "react";
import {
  deletePerson,
  getPersons,
  postPerson,
  updatePersonNumber,
} from "./services/PersonService";

const Filter = ({ onFilterChange }) => {
  return (
    <>
      <div>
        filter shown with:
        <input onChange={onFilterChange} />
      </div>
    </>
  );
};

const Persons = ({ persons, filter, onDeleted }) => {
  return (
    <>
      <ul>
        {persons.map((person) => {
          if (
            !filter ||
            person.name.toLowerCase().includes(filter.toLowerCase())
          ) {
            return (
              <li key={person.id}>
                {person.name} {person.number}
                <button
                  onClick={() => {
                    onDeleted(person);
                  }}
                >
                  delete
                </button>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

const PersonForm = ({ persons, onPersonAdd }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onPersonAdd(newName, newNumber);
        }}
      >
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Notification = ({ message, isDanger }) => {
  return (
    <div
      style={{
        color: isDanger ? "red" : "green",
        backgroundColor: "lightgrey",
        fontSize: "20px",
        textAlign: "center",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{message}</h3>
    </div>
  );
};

const App = () => {
  // jelek :(, ini bikin se-page render ulang
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState();

  useEffect(() => {
    getPersons()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => {
        setNotification({
          isDanger: true,
          message: `Cannot load data from API`,
        });
        setTimeout(() => setNotification(), 5000);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      {notification && (
        <Notification
          isDanger={notification.isDanger}
          message={notification.message}
        />
      )}

      <Filter onFilterChange={(e) => setFilter(e.target.value)} />

      <h3>Add New</h3>
      <PersonForm
        persons={persons}
        onPersonAdd={(newName, newNumber) => {
          if (
            persons.some((person) => person.name === newName) &&
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with new one?`
            )
          ) {
            const indexOfPerson = persons.findIndex(
              (person) => person.name === newName
            );

            updatePersonNumber(indexOfPerson + 1, newName, newNumber)
              .then((response) => {
                let newPersons = [...persons];
                newPersons[indexOfPerson].number = newNumber;
                setPersons(newPersons);

                setNotification({
                  isDanger: false,
                  message: `Changed ${newName}'s number`,
                });
                setTimeout(() => setNotification(), 5000);
              })
              .catch((error) => {
                setNotification({
                  isDanger: true,
                  message: `Cannot change ${newName}'s number`,
                });
                setTimeout(() => setNotification(), 5000);
              });
            return;
          }

          postPerson(newName, newNumber)
            .then((newPerson) => {
              setPersons([...persons, newPerson]);
              setNotification({
                isDanger: false,
                message: `Added ${newName}`,
              });
              setTimeout(() => setNotification(), 5000);
            })
            .catch((error) => {
              setNotification({
                isDanger: true,
                message: `Cannot add ${newName}`,
              });
              setTimeout(() => setNotification(), 5000);
            });
        }}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        onDeleted={(person) => {
          if (window.confirm(`Delete ${person.name}?`)) {
            deletePerson(person.id)
              .then((response) => {
                setPersons(
                  persons.filter((newPerson) => newPerson.id !== person.id)
                );
                setNotification({
                  isDanger: false,
                  message: `Deleted ${person.name}`,
                });
                setTimeout(() => setNotification(), 5000);
              })
              .catch((error) => {
                console.log(error);
                setNotification({
                  isDanger: true,
                  message:
                    error.response.status === 404
                      ? `Information of ${person.name} has already been removed from server`
                      : `Cannot delete ${person.name}`,
                });
                setTimeout(() => setNotification(), 5000);
              });
          }
        }}
      />
    </div>
  );
};

export default App;
