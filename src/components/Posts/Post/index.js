//import { useState } from "react";
import { getCategory, getStatus } from '../../../includes/variables';
import './styles.scss';
import { BiLike, BiDislike } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, dislikePost, removePost } from '../../../redux/postSlice';
import { Link } from 'react-router-dom';
import * as database from '../../../database';
import { async } from '@firebase/util';

export default function Post({
  id,
  title,
  description,
  category,
  promote,
  status,
  picture,
  likes,
  dislikes,
}) {
  const { allowLikes, allowDislikes } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleLikeClik = async (event) => {
    event.preventDefault();
    dispatch(likePost(id));
    // onPostLike(id);
    const data = { likes: likes + 1 };
    const updated = await database.update(id, data);
    if (!updated) {
      alert('Failed to update likes.');
      //TODO: Improve the mesage to the user
      //TODO: Create a Redux action to remove one like..
    }
  };

  const handleDislikeClik = async (event) => {
    event.preventDefault();
    dispatch(dislikePost(id));

    const data = { dislikes: dislikes + 1 };
    const updated = await database.update(id, data);
    if (!updated) {
      alert('Failed to update dislikes.');
      //TODO: Improve this
    }
  };

  const handleRemoveClick = async (event) => {
    event.preventDefault();

    //Remove from Redux store
    dispatch(removePost(id));

    //Remove from Database.
    const removed = await database.remove(id);
    if (!removed) {
      alert('Failed to remove post.');
      //TODO: Improve this.
    }
  };

  const promoteStyle = promote ? 'promote-yes' : 'promote-no';

  let rateClassName = 'rate';
  if (!allowLikes || !allowDislikes) {
    rateClassName += ' rate-single-button';
  }

  return (
    <Link
      to={'/posts/' + id}
      className="post-component"
    >
      {/* Title */}
      <h3>{title}</h3>
      {/* Description */}
      <div className="description">
        <img
          src={picture}
          alt={title}
        />
        <span>{description}</span>
      </div>
      {/* Other info */}
      <div className="info">
        <div>
          Category:
          <strong>{getCategory(category)}</strong>
        </div>
        <div>
          Status:
          <strong>{getStatus(status)}</strong>
        </div>
        <div className={promoteStyle}>
          Promote:
          <strong>{promote ? 'Yes' : 'No'}</strong>
        </div>
      </div>

      {/* rate buttons, we want to conditionally render the div itself */}
      {(allowLikes || allowDislikes) && (
        <div className={rateClassName}>
          {/* We want to conditionally render the Like  button */}
          {allowLikes && (
            <button
              title="I like this"
              className="like"
              onClick={handleLikeClik}
            >
              <BiLike />
              {likes}
            </button>
          )}
          {/* We equally want to conditionally render the Dislike Button */}
          {allowDislikes && (
            <button
              title="I dislike this"
              className="dislike"
              onClick={handleDislikeClik}
            >
              <BiDislike />
              {dislikes}
            </button>
          )}
        </div>
      )}

      <button onClick={handleRemoveClick}>Remove</button>
    </Link>
  );
}
