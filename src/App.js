import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the modern CSS

const API_URL = "http://localhost:3000/superheroes";

function App() {
  const [superheroes, setSuperheroes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    superpower: "",
    humilityScore: "",
  });

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get(API_URL);
      setSuperheroes(response.data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSuperhero = { 
      ...formData, 
      humilityScore: Number(formData.humilityScore) 
    };

    try {
      await axios.post(API_URL, newSuperhero);
      fetchSuperheroes();
      setFormData({ name: "", superpower: "", humilityScore: "" });
    } catch (error) {
      console.error("Error adding superhero:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Humble Superhero API</h1>

      {/* Form */}
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

      {/* Superheroes List */}
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
