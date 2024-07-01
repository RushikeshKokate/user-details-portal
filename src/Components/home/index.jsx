 import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {updateFormData} from "../action/action"
import { useState } from 'react';
import './home.css'
const Home = (props) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleSave = () => {
    dispatch(updateFormData(editableData));
    setEditMode(false);
  };

  return (
    <div className='main_div'>
      <h2>{props.name ? `WElCOME BACK ${props.name}` : "Login please"}</h2>
      <div>
      {editMode ? (
        <div>
          {Object.keys(editableData).map((key) => (
            <div key={key}>
              <label>{key}:</label>
              <input
                type="text"
                name={key}
                value={editableData[key]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <strong>{key}:</strong> {formData[key]}
            </div>
          ))}
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
      </div>
    </div>
  );
};

 
 export default Home