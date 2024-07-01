import React, { useState, useEffect } from 'react';
import './UserForm.css';
import { useDispatch  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveFormData } from '../action/action';

const UserForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    interests: [],
    country: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckBox = (e) => {
    const { value, checked } = e.target;
    setIsDirty(true);
    setFormData((prevData) => {
      const newInterests = checked
        ? [...prevData.interests, value]
        : prevData.interests.filter((interest) => interest !== value);
      return { ...prevData, interests: newInterests };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setIsDirty(true);
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters long';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.country) errors.country = 'Country is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
       
      try {
        setIsDirty(false);
        setSubmittedData(formData);
        console.log(formData);
        setFormData({
          name: '',
          email: '',
          password: '',
          gender: '',
          interests: [],
          country: '',
        });
        dispatch(saveFormData(formData));
        navigate('/Success');
      } catch (error) {
        console.error('Error creating user:', error.message);
      }
    }
  };
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className='main_div'>
      <h1 className='heading'>User Form</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label htmlFor="name">
            Name:
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleTextChange} />
          </label>
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input type="email" name="email" placeholder="example@gmail.com" value={formData.email} onChange={handleTextChange} />
          </label>
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <div className="form_control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleTextChange}
          />
          {formErrors.password && <span className="error">{formErrors.password}</span>}
        </div>
        <div>
          <label>
            <input type="radio" name="gender" value="Male" onChange={handleTextChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" onChange={handleTextChange} /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="Other" onChange={handleTextChange} /> Other
          </label>
          {formErrors.gender && <span className="error">{formErrors.gender}</span>}
        </div>
        <div>
          <label htmlFor="interests">Interests:</label>
          <label>
            <input type="checkbox" name="interests" value="Sports" onChange={handleCheckBox} /> Sports
          </label>
          <label>
            <input type="checkbox" name="interests" value="Music" onChange={handleCheckBox} /> Music
          </label>
          <label>
            <input type="checkbox" name="interests" value="Travel" onChange={handleCheckBox} /> Travel
          </label>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select name="country" value={formData.country} onChange={handleTextChange}>
            <option value="">Select your country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
          {formErrors.country && <span className="error">{formErrors.country}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
