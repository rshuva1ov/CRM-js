// EDIT CLIENT

import { sendClientData } from "./clientsAPI.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClientsForm } from "./createModalForm.js";

export const editClientModal = (data) => {
  const editModal = document.createElement("div");
  const editModalContent = document.createElement("div");
  const createForm = createClientsForm();
  const editModalId = document.createElement("span");

  editModal.classList.add("modal-edit", "site-modal", "modal-active");
  editModalContent.classList.add("edit-modal__content", "site-modal__content", "modal-active");
  editModalId.classList.add("edit-modal__id");

  createForm.modalHeading.textContent = "Изменить данные";
  createForm.cancelButton.textContent = "Удалить клиента";
  editModalId.textContent = "ID: " + data.id.substr(data.id.length - 5);

  //удаление через модалку изменить
  createForm.cancelButton.addEventListener("click", (e) => {
    e.preventDefault();

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal);

    import("./clientsAPI.js").then(({ deleteClientItem }) => {
      deleteModal.deleteModalDelete.addEventListener("click", () => {
        deleteClientItem(data.id);
        document.getElementById(data.id).remove();
      });
    });
  });

  createForm.modalCloseButton.addEventListener("click", () => {
    editModal.remove();
  });

  createForm.inputName.value = data.name;
  createForm.inputSurname.value = data.surname;
  createForm.inputLastName.value = data.lastName;

  for (const contact of data.contacts) {
    const createContact = createContactItem();

    createContact.contactNameButton.textContent = contact.type;
    createContact.contactInput.value = contact.value;

    createForm.contactsBlock.prepend(createContact.contact);
    createForm.contactsBlock.style.backgroundColor = "var(--athens-gray)";
  }

  if (data.contacts.lelength == 10) {
    createForm.addContactButton.classList.remove("modal__button-contact--active");
  }

  createForm.modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const contactTypes = document.querySelectorAll(".contact__button-name");
    const contactValues = document.querySelectorAll(".contact__input");

    let contacts = [];
    let client = {};

    for (let i = 0; i < contactTypes.length; i++) {
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    client.name = createForm.inputName.value;
    client.surname = createForm.inputSurname.value;
    client.lastName = createForm.inputLastName.value;
    client.contacts = contacts;

    sendClientData(client, "PATCH", data.id);
  });

  editModalContent.append(createForm.modalCloseButton, createForm.modalHeading, createForm.modalForm);
  editModal.append(editModalContent);
  createForm.modalHeading.append(editModalId);

  document.addEventListener("click", (e) => {
    if (e.target == editModal) {
      editModal.remove();
    }
  });

  return {
    editModal,
    editModalContent,
  };
};
