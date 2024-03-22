import React, { useState } from 'react';
function Account() {
  const [selectedOption, setSelectedOption] = useState({
  hairtype: '',
  hairtexture: '',
  haircolor: '',
  hairlength: '',
  hairgoals: '',
});

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted data:', selectedOption);
    // You can send this data to an API or perform other actions.
  };
  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return <>
  <h1>Hair Profile</h1>
  <form onSubmit={handleSubmit}>
      <input
      type='text'
      name='hairtype' 
      placeholder='Hair Type'
      list='hairType'
      value={selectedOption.hairtype}
      onChange={handleInputChange}>
      </input>
      <datalist id='hairType'>
          <option value='Straight'/>
          <option value='Wavy'/>
          <option value='Curly'/>
          <option value='Coiled'/>
      </datalist>
      <input 
      type='text'
      name='hairtexture'
      placeholder='Hair Texture'
      list='hairTexture'
      value={selectedOption.hairtexture}
      onChange={handleInputChange}>
      </input>
      <datalist id='hairTexture'>
          <option value='Fine'/>
          <option value='Medium'/>
          <option value='Thick'/>
      </datalist>
      <input 
      type='text'
      name='haircolor'
      placeholder='Hair Color'
      list='hairColor'
      value={selectedOption.haircolor}
      onChange={handleInputChange}>
      </input>
      <datalist id='hairColor'>
      <option value='Black'/> 
      <option value='Brown'/> 
      <option value='Red'/>
      <option value='Blonde'/>
      <option value='Grey'/> 
      <option value='Dyed'/> 
      </datalist>
      <input 
      type='text'
      name='hairlength'
      placeholder='hairLength'
      list='hairLength'
      value={selectedOption.hairlength}
      onChange={handleInputChange}>
      </input>
      <datalist id='hairLength'>
      <option value='Short'/> 
      <option value='Ear Length'/> 
      <option value='Shoulder Length'/>
      <option value='Down Your Back'/>
      </datalist>
      <input 
      type='text'
      name='hairgoals'
      placeholder='Hair Goals'
      value={selectedOption.hairgoals}
      onChange={handleInputChange}>
      </input>
      <button className='accButton' type='submit'>Submit</button>
  </form>
  <a href='/login'><button>Login</button></a>
  </>
}
export default Account;
