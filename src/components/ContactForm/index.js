import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');

  const emailInput = useRef(null);

  function handleClick() {
    console.log(emailInput.current.value);
  }

  return (
    <Form>
      <button type="button" onClick={handleClick}>
        Loga emailInput
      </button>
      <FormGroup>
        <Input
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          defaultValue="marcosdouglas@devacademy.com"
          placeholder="E-mail"
          ref={emailInput}
        />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="instagram">Instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
