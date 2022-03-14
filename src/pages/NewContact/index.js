import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';

export default function NewContact() {
  return (
    <>
      <PageHeader
        itle="Novo contato"
      />
      <ContactForm
        buttonLabel="Cadastrar"
      />
    </>
  );
}
