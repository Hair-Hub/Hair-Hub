import React, { useState } from 'react';
function Account() {
  const [formData, setFormData] = useState({
    hairtype: '',
    hairtexture: '',
    haircolor: '',
    hairlength: '',
    hairGoals: '',
    // Add other relevant fields (e.g., age, location, etc.)
  });
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted data:', formData);
    // You can send this data to an API or perform other actions.
  };
  // Handle input changes
  const handleInputChange = (event) => {
    const { goals, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [goals]: value,
    }));
  };
  return <>
  <h1>Hair Profile</h1>
  <form onSubmit={handleSubmit}>
      <input type='' 
      placeholder='Hair Type'
      list='hairType'>
      </input>
      <datalist id='hairType'>
          <option value='Straight'></option>
          <option value='Wavy'></option>
          <option value='Curly'></option>
          <option value='Coiled'></option>
      </datalist>
      <input type='text'
      placeholder='Hair Texture'
      list='hairTexture'>
      </input>
      <datalist id='hairTexture'>
          <option value='Fine'></option>
          <option value='Medium'></option>
          <option value='Thick'></option>
      </datalist>
      <input type='text'
      placeholder='Hair Color'
      list='hairColor'>
      </input>
      <datalist id='hairColor'>
      <option value='Black'></option> 
      <option value='Brown'></option> 
      <option value='Red'></option>
      <option value='Blonde'></option>
      <option value='Grey'></option> 
      <option value='Dyed'></option> 
      </datalist>
      <input type='text'
      placeholder='hairLength'
      list='hairLength'>
      </input>
      <datalist id='hairLength'>
      <option value='Short'></option> 
      <option value='Ear Length'></option> 
      <option value='Shoulder Length'></option>
      <option value='Down Your Back'></option>
      </datalist>
      <label>Hair Goals</label>
      <input type='text'
      value={formData.bio}
      onChange={handleInputChange}>
      </input>
      <button className='accButton' type='submit'></button>
  </form>
  <a href='/login'><button>Login</button></a>
  </>
}
export default Account;
