//import { Component } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAllowLikes,
  toggleAloowDislikes,
} from '../../redux/settingsSlice';

export default function Setting() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleAllowLikesClick = () => {
    dispatch(toggleAllowLikes());
    console.log('Allow likes');
  };

  const handleAllowDislikesClick = () => {
    dispatch(toggleAloowDislikes());
  };

  return (
    <div className="settings-component">
      <h2>Settings</h2>
      <div className="field">
        <label>
          <input
            type="checkbox"
            checked={settings.allowLikes}
            onChange={handleAllowLikesClick}
          />
          Allow Likes
        </label>
      </div>

      <div className="field">
        <label>
          <input
            type="checkbox"
            checked={settings.allowDislikes}
            onChange={handleAllowDislikesClick}
          />
          Allow Dislikes
        </label>
      </div>
    </div>
  );
}
