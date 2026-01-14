import { useEffect, useState, useCallback, useMemo, useDeferredValue } from "react";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [isLoading, setIsloading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(
    // eslint-disable-next-line max-len
    () => contacts.filter((contact) => contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())),
    [contacts, deferredSearchTerm],
  );

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsloading(true);

      const contactsList = await ContactsService.listContacts(orderBy, signal);
      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if(error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setHasError(true);
      setContacts([]);
    } finally {
      setIsloading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id)
      );

      handleCloseDeleteModal();

      toast({
        type: "success",
        text: "Contato deletado com sucesso!",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao deletar contato!",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    orderBy,
    contacts,
    filteredContacts,
    searchTerm,
    isLoading,
    hasError,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
  };
}
