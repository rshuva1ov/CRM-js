// CLIENTS CREATE
import { addClientModal } from "./addClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddUser } from "./svg.js";

export const createClients = () => {
  const section = document.createElement("section");
  const h1 = document.createElement("h1");
  const container = document.createElement("div");
  const main = document.createElement("main");
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const tableWrapper = document.createElement("div");
  const sortingDisplay = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const sortingDisplayId = document.createElement("td");
  const sortingDisplayName = document.createElement("td");
  const sortingDisplayCreate = document.createElement("td");
  const createSpan = document.createElement("span");
  const sortingDisplayEdit = document.createElement("td");
  const editSpan = document.createElement("span");
  const sortingDisplayContacts = document.createElement("td");
  const sortingDisplayActions = document.createElement("td");
  const sortingDisplaySpan = document.createElement("span");
  const addUserButton = document.createElement("button");
  const addUserButtonSvg = document.createElement("span");

  section.classList.add("clients");
  container.classList.add("container", "clients__container");
  h1.classList.add("clients__heading");
  main.classList.add("main");
  tableWrapper.classList.add("clients__wrapper");
  table.classList.add("clients__table");
  tableBody.classList.add("clients__tbody");
  sortingDisplay.classList.add("clients__display", "displayinfo");
  sortingDisplayId.classList.add("displayinfo__item", "displayinfo__item-id", "sort-up");
  sortingDisplayName.classList.add("displayinfo__item", "displayinfo__item-name", "sort-down");
  sortingDisplayCreate.classList.add("displayinfo__item", "displayinfo__item-create", "sort-down");
  createSpan.classList.add("create-span");
  sortingDisplayEdit.classList.add("displayinfo__item", "displayinfo__item-edit", "sort-down");
  editSpan.classList.add("edite-span");
  sortingDisplayContacts.classList.add("displayinfo__item", "displayinfo__item-contacts");
  sortingDisplayActions.classList.add("displayinfo__item", "displayinfo__item-actions");
  sortingDisplaySpan.classList.add("displayinfo__sorting");
  addUserButton.classList.add("clients__button");
  addUserButtonSvg.classList.add("clients__svg");

  h1.textContent = "Клиенты";
  sortingDisplayId.textContent = "id";
  sortingDisplayName.textContent = "Фамилия Имя Отчество";
  sortingDisplaySpan.textContent = "а-я";
  sortingDisplayCreate.textContent = "Дата и время";
  sortingDisplayEdit.textContent = "Последние ";
  sortingDisplayContacts.textContent = "Контакты ";
  sortingDisplayActions.textContent = "Действия ";
  addUserButton.textContent = "Добавить клиента";
  addUserButtonSvg.innerHTML = svgAddUser;

  addUserButton.addEventListener("click", () => {
    document.body.append(addClientModal());
  });

  main.append(section);
  section.append(container);
  sortingDisplayName.appendChild(sortingDisplaySpan);
  sortingDisplayCreate.append(createSpan);
  sortingDisplayEdit.append(editSpan);
  theadTr.append(sortingDisplayId, sortingDisplayName, sortingDisplaySpan, sortingDisplayCreate, sortingDisplayEdit, sortingDisplayContacts, sortingDisplayActions);
  sortingDisplay.append(theadTr);
  tableWrapper.append(table);
  table.append(sortingDisplay, tableBody);
  tableBody.append(createPreloader()); 
  addUserButton.append(addUserButtonSvg);
  container.append(h1, tableWrapper, addUserButton);

  return {
    main,
    table,
    tableBody,
  };
};
