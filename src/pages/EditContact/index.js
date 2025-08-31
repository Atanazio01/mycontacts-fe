import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useEffect, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);
        console.log(contactData);
        setIsLoading(false);
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

      <PageHeader title="Editar Marcos Douglas" />

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={() => handleSubmit}
      />
    </>
  );
}
