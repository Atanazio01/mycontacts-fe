import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useEffect, useRef, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);
        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
        setContactName(contact.name);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
      }
    }

    loadContact();
  }, [id, history]);

  function handleSubmit() {
    // TODO
  }
  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={() => handleSubmit}
      />
    </>
  );
}
