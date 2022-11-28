// CLIENT ITEM CREATE

import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { createContactItemByType, formatDate, formatTime } from "./utls.js";

export const createClientItem = (data) => {
  const clientTr = document.createElement("tr");
  const clientId = document.createElement("span");
  const clientFullName = document.createElement("td");
  const clientName = document.createElement("span");
  const clientSurname = document.createElement("span");
  const clientLastname = document.createElement("span");
  const clientCreated = document.createElement("td");
  const createdDate = document.createElement("span");
  const createdTime = document.createElement("span");
  const clientChanged = document.createElement("td");
  const changedDate = document.createElement("span");
  const changedTime = document.createElement("span");
  const clientContacts = document.createElement("td");
  const clientActions = document.createElement("td");
  const clientEdit = document.createElement("button");
  const clientDelete = document.createElement("button");
  const deleteClient = deleteClientModal();
  const editClient = editClientModal(data);

  clientTr.classList.add("clients__item");
  clientTr.id = data.id;
  clientId.classList.add("clients__id");
  clientFullName.classList.add("clients__full-name");
  clientName.classList.add("clients__name");
  clientSurname.classList.add("clients__surname");
  clientLastname.classList.add("clients__lastname");
  clientCreated.classList.add("clients__created");
  createdDate.classList.add("created__date");
  createdTime.classList.add("created__time");
  clientChanged.classList.add("clients__changed");
  changedDate.classList.add("changed__date");
  changedTime.classList.add("changed__time");
  clientContacts.classList.add("clients__contacts");
  clientActions.classList.add("clients__actions");
  clientDelete.classList.add("clients__delete");
  clientEdit.classList.add("clients__edit");

  for (const contact of data.contacts) {
    createContactItemByType(contact.type, contact.value, clientContacts);
  }

  const deleteById = () => {
    import("./clientsAPI.js").then(({ deleteClientItem }) => {
      deleteClient.deleteModalDelete.addEventListener("click", () => {
        deleteClientItem(data.id);
        document.getElementById(data.id).remove();
      });
    });
  };

  clientDelete.addEventListener("click", () => {
    deleteById();
    document.body.append(deleteClient.deleteModal);
  });

  clientEdit.addEventListener("click", () => {
    document.body.append(editClient.editModal);
  });

  clientId.textContent = data.id.substr(data.id.length - 5);
  clientName.textContent = data.name;
  clientSurname.textContent = data.surname;
  clientLastname.textContent = data.lastName;
  clientEdit.textContent = "Изменить";
  clientDelete.textContent = "Удалить";
  // Функция форматирования даты и времени
  createdDate.textContent = formatDate(data.createdAt);
  createdTime.textContent = formatTime(data.createdAt);
  changedDate.textContent = formatDate(data.updatedAt);
  changedTime.textContent = formatTime(data.updatedAt);

  clientFullName.append(clientSurname, clientName, clientLastname);
  clientCreated.append(createdDate, createdTime);
  clientChanged.append(changedDate, changedTime);
  clientActions.append(clientEdit, clientDelete);
  clientTr.append(clientId, clientFullName, clientCreated, clientChanged, clientContacts, clientActions);

  return clientTr;
};
