import { createSidePanel } from "./sidePanel.js";
import { createTaskContainer, createView } from "./taskContainer.js";
import {init} from "./data.js";


const target = document.querySelector("#target");
target.append(createSidePanel(), createTaskContainer("Inbox"));
init();
const sidePanel = document.querySelector(".side-panel");
sidePanel.addEventListener("click", () => {
    const option = sidePanel.querySelector(".has-background-info-light").getAttribute("data-value");
    document.querySelector(".task-container .container").innerHTML = "";
    document.querySelector(".task-container .container").append(createView(option))

});

