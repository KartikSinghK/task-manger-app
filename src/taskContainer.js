import { createCard } from "./card.js";
import { getUniqueID } from "./uniqueID.js";
import { format } from "date-fns";
import { getData } from "./data.js";

function createButton(text, view) {
	const button = document.createElement("button");
	button.classList.add("button", "is-info", "is-light", "new-todo");
	button.setAttribute("value", view);
	button.innerHTML = `
    <span class="icon is-small">
        <ion-icon name="add-outline"></ion-icon>
    </span>
    <span>Add</span>`;

	button.addEventListener("click", () => {
		const allTasks = document.querySelector(".allTasks");
		const card = createCard(
			"",
			"",
			"",
			"None",
			getUniqueID(),
			view === "Today" ? format(new Date(), "yyyy-MM-dd") : "",
			view !== "Today" || view !== "Inbox" ? view : "defaultProject"
		);
		allTasks.append(card);
	});
	return button;
}
function getSavedTasks(allTasks, today) {
	const taskArray = [];
	for (let key in allTasks) {
		if (today) {
			if (allTasks[key]["date"] === format(new Date(), "yyyy-MM-dd")) {
				taskArray.push(
					createCard(
						allTasks[key]["title"],
						allTasks[key]["description"],
						allTasks[key]["tag"],
						allTasks[key]["priority"],
						key.toString(),
						allTasks[key]["date"],
						allTasks[key]["project"]
					)
				);
			}
		} else
			taskArray.push(
				createCard(
					allTasks[key]["title"],
					allTasks[key]["description"],
					allTasks[key]["tag"],
					allTasks[key]["priority"],
					key.toString(),
					allTasks[key]["date"],
					allTasks[key]["project"]
				)
			);
	}
	return taskArray;
}
function projectText(projectName) {
	return projectName.replace(/-/g, " ");
}
export function createView(headingText, isFilters = false) {
	const mainContainer = document.createElement("div");
	const headingContainer = document.createElement("div");
	const heading = document.createElement("p");
	const allTasks = document.createElement("div");
	allTasks.classList.add("allTasks");
	headingContainer.classList.add(
		"is-flex",
		"is-justify-content-space-between",
		"is-align-items-end"
	);
	mainContainer.classList.add(
		"is-flex",
		"is-flex-direction-column",
		"is-justify-content-center",
		"pt-5"
	);
	heading.classList.add("is-size-4", "has-text-weight-bold");
	heading.innerText = `${headingText.replace(/-/g, " ")}`;
	headingContainer.append(heading, createButton("Add", headingText));

	mainContainer.append(
		headingContainer,
		document.createElement("hr"),
		allTasks
	);
	allTasks.append(
		...getSavedTasks(getData(headingText), headingText === "Today")
	);
	return mainContainer;
}
export function createTaskContainer(option) {
	const taskContainer = document.createElement("div");
	const container = document.createElement("div");

	taskContainer.classList.add("column", "task-container");
	container.classList.add("container");
	container.append(createView(option));
	taskContainer.append(container);
	return taskContainer;
}
