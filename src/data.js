// this data object will store the data of each project
// there is a default project which will be used
import { createMenuItem } from "./menuItem";
const database = {};
export function setData(data, id) {
	if (!database[data.project]) database[data.project] = {};
	database[data.project][id] = data;
	window.localStorage.setItem(
		data.project,
		JSON.stringify(database[data.project])
	);
	console.log(database);
}
export function addProject(projecName) {
	database[projecName] = {};
	localStorage.setItem(projecName, "{}");
}
export function removeData(project, id) {
	delete database[project][id];
	window.localStorage.setItem(project, JSON.stringify(database[project]));
}

export function init() {
	Object.keys(localStorage).forEach(function (key) {
		database[key] = JSON.parse(localStorage.getItem(key));
		if (key !== "defaultProject")
			document
				.querySelector(".side-panel")
				.append(
					createMenuItem(
						key.replace(/-/g, " "),
						'<ion-icon name="rocket-outline"></ion-icon>',
						["is-clickable", "p-2", "menu-item", "is-project"]
					)
				);
	});
}
export function getData(project) {
    if (project === "Today" || project === "Inbox")
        return database["defaultProject"]
	return database[project];
}
