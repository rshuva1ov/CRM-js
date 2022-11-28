// APP CREATE

import { createClientsHeader } from "./createHeader.js";
import { createClients } from "./createClients.js";
import { getClients } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";

const createApp = async () => {
  const header = createClientsHeader();
  const clientsSection = createClients();
  document.body.append(header, clientsSection.main);
  const clients = await getClients();

  window.onload = () => {
    const preloader = document.querySelector(".preloader");
    preloader.remove();
    
    for (const client of clients) {
      clientsSection.tableBody.append(createClientItem(client));
    }
  };
};
createApp();
