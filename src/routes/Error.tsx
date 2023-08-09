import { Accent } from '../components/Accent';
import './Error.css';

export const Error = () => {
  return (
    <div className="fullscreen center-content-vertically">
      <div style={{ textAlign: 'center'}}>
        <h1 className="display-text">ERROR<Accent>.</Accent></h1>
        <p>Sorry, this page doesn't exist.</p>
      </div>
    </div>
  );
};