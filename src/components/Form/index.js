import { useState, useRef } from 'react';
import { categories } from '../../includes/variables';
import { statuses } from '../../includes/variables';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/postSlice';
import * as database from '../../database';

export default function Form() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [promote, setPromote] = useState(true);
  const [status, setStatus] = useState('');
  const [picture, setPicture] = useState('');
  const [errorMesages, setErrorMessages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  //Create dispatch
  const dispatch = useDispatch();
  const inputFile = useRef();

  // handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Hide Success Message
    setShowSuccess(false);

    //Validating the data
    const validate = [];
    if (title.length < 5) {
      validate.push('The title must be at least 5 characters long');
    }

    if (description === '') {
      validate.push('The description is required.');
    }

    if (category === '') {
      validate.push('Please, select a category.');
    }

    if (status === '') {
      validate.push('Please, select a status');
    }

    if (picture === '') {
      validate.push('Please, select a picture.');
    }

    setErrorMessages(validate);
    if (validate.length === 0) {
      setIsSaving(true);

      //Upload the picture.
      const file = inputFile.current.files[0];
      const pictureUrl = await database.uploadPicture(file);
      if (pictureUrl) {
        //I want it to only save if this is fulfilled.
        //Valid data.
        const data = {
          //Note: the idea here is that in an object, if the key = value, you can just
          //add the key without providing the value. it will be be understood.
          title,
          description,
          category,
          promote,
          status,
          picture: pictureUrl,
          likes: 0,
          dislikes: 0,
        };
        const savedId = await database.save(data);
        //setIsSaving(false);
        if (savedId) {
          dispatch(addPost(data));
          //Display Success Message
          setShowSuccess(true);
          //Clear the form
          setTitle('');
          setDescription('');
          setCategory('');
          setPromote(true);
          setStatus('');
          setPicture('');
          if (inputFile.current) {
            inputFile.current.value = '';
          }
        } else {
          setErrorMessages(['Failed to save data.']);
        }
      } else {
        setErrorMessages(['Failed to upload the picture.']);
      }

      // Hide the Saving message.
      setIsSaving(false);
    }
  };

  const handlePictureSelection = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setPicture(event.target.result);
    };
  };

  //If data is being saved to the database
  if (isSaving) {
    return <div>Saving...</div>;
  }

  // Render
  return (
    <form
      className="form-component"
      onSubmit={handleFormSubmit}
    >
      {showSuccess && (
        <div className="success-message">Form Successfully Submitted!</div>
      )}
      {/* Conditionally display the error message */}
      {errorMesages.length > 0 && (
        <div className="form-validate">
          Invalid data:
          <ul>
            {errorMesages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Title field */}
      <div>
        <label>
          Title:
          <input
            id="titleInput"
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            maxLength={50}
            placeholder="Enter title here"
            required={true}
          />
        </label>
      </div>

      {/* Description Field */}
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your post"
            maxLength={1000}
          />
        </label>
      </div>

      {/* Category Field */}
      <div>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-select-</option>
            {categories.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.text}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Promote Field */}
      <div className="promote-field">
        <label>
          <input
            type="checkbox"
            checked={promote}
            onChange={(e) => setPromote(e.target.checked)}
          />
          Promote
        </label>
      </div>

      {/* Status Field (darft, Published, Archived ) */}
      <div className="status-field">
        Status:
        {statuses.map((item) => (
          <label key={item.id}>
            <input
              type="radio"
              value={item.id}
              checked={status === item.id}
              onChange={(e) => setStatus(e.target.value)}
            />
            {item.text}
          </label>
        ))}
      </div>

      {/* Picture Field */}
      <fieldset>
        <legend>Picture:</legend>
        <label>
          Select an image
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureSelection}
            ref={inputFile}
          />
        </label>

        {/*Conditionally preview the image */}
        {picture !== '' && (
          <img
            src={picture}
            alt="Preview"
            width={100}
          />
        )}
      </fieldset>

      <button>Send</button>
    </form>
  );
}
