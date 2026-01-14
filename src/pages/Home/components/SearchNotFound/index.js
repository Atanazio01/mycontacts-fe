 

import PropTypes from 'prop-types';
import { Container } from './styles';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export default function SearchNotFound({ value }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier Question" />

      <span>
        Nenhum resultado foi encontrado para <strong>{value}</strong>.
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  value: PropTypes.string.isRequired,
};
