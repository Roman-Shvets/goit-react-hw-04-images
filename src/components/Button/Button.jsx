import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
  handlePagination = evt => {
    this.props.pageSubmit();
  };

  render() {
    const pictures = this.props.toVisible;
    return (
      <>
        {pictures.length > 0 ? (
          <div className={css.ButtonContainer}>
            <button
              className={css.ButtonLoad}
              type="button"
              onClick={this.handlePagination}
            >
              Load more
            </button>
          </div>
        ) : null}
      </>
    );
  }
}

export default Button;

Button.propTypes = {
  toVisible: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
