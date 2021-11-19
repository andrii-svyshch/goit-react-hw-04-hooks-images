import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './SearchForm.module.css';
import { toast } from 'react-toastify';

export default class SearchForm extends Component {
  state = {
    pictureName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleNameChange = event => {
    this.setState({
      pictureName: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.pictureName.trim() === '') {
      return toast.error('What are you looking for?');
    }
    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
  };

  render() {
    const { pictureName } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          value={pictureName}
          placeholder="Search images and photos"
          onChange={this.handleNameChange}
        />
      </form>
    );
  }
}
