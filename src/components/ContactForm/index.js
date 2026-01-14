import PropTypes from 'prop-types';
import {
  forwardRef,
} from 'react';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    name,
    email,
    phone,
    categoryId,
    categories,
    isLoadgingCategories,
    isSubmiting,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    setCategoryId,
    isFormValid,
    getErrorMessageByFieldName,
    handleSubmit,
  } = useContactForm(ref, onSubmit);

  return (
    <Form onSubmit={(event) => handleSubmit(event)} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          $error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={(event) => handleNameChange(event)}
          disabled={isSubmiting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          $error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={(event) => handleEmailChange(event)}
          disabled={isSubmiting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event) => handlePhoneChange(event)}
          maxLength="15"
          disabled={isSubmiting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadgingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadgingCategories || isSubmiting}
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmiting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.displayName = 'ContactForm';

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
