import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Importing the CSS file for styling

// API endpoint for fetching and storing superheroes
const API_URL = "http://localhost:3000/superheroes";

function App() {
  // State to store the list of superheroes
  const [superheroes, setSuperheroes] = useState([]);

  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    superpower: "",
    humilityScore: "",
  });

  // Fetch superheroes when the component mounts
  useEffect(() => {
    fetchSuperheroes();
  }, []);

  // Function to retrieve superhero data from the backend
  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get(API_URL);
      setSuperheroes(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  // Function to handle changes in form input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    // Convert humilityScore to a number before sending data
    const newSuperhero = { 
      ...formData, 
      humilityScore: Number(formData.humilityScore) 
    };

    try {
      await axios.post(API_URL, newSuperhero); // Send new superhero to backend
      fetchSuperheroes(); // Refresh list after adding a new superhero
      // Reset form fields after submission
      setFormData({ name: "", superpower: "", humilityScore: "" });
    } catch (error) {
      console.error("Error adding superhero:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Humble Superhero API</h1>

      {/* Superhero Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Superhero Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="superpower"
          placeholder="Superpower"
          value={formData.superpower}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="humilityScore"
          placeholder="Humility Score (1-10)"
          value={formData.humilityScore}
          onChange={handleChange}
          min="1"
          max="10"
          required
        />
        <button type="submit">Add Superhero</button>
      </form>

      {/* List of Superheroes */}
      <h2>Superheroes (Sorted by Humility)</h2>
      <ul>
        {superheroes.length > 0 ? (
          superheroes.map((hero, index) => (
            <li key={index}>
              <span><strong>{hero.name}</strong> - {hero.superpower} (Humility: {hero.humilityScore})</span>
            </li>
          ))
        ) : (
          <p>No superheroes yet. Add one!</p>
        )}
      </ul>
    </div>
  );
}

export default App;
