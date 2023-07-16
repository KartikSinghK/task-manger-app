import { createMenuItem } from "./menuItem.js";
import { addProject } from "./data.js";

export function createSidePanel() {
	const sidePanel = document.createElement("div");
	const projectHeading = document.createElement("div");
	const title = document.createElement("p");
	const iconContainer = document.createElement("div");
	iconContainer.innerHTML = `<ion-icon name="add-outline"></ion-icon>`;
	iconContainer.classList.add(
		"is-size-5",
		"is-flex",
		"is-align-items-center",
		"is-clickable",
		"add-project"
	);
	projectHeading.classList.add(
		"is-flex",
		"is-justify-content-space-between",
		"is-align-items-center",
		"mt-3",
		"mb-3"
	);
	projectHeading.append(title, iconContainer);
	title.classList.add(
		"is-size-6",
		"has-text-weight-semibold",
		"has-text-grey"
	);
	title.innerText = "Projects";
	sidePanel.classList.add(
		"column",
		"side-panel",
		"is-flex",
		"is-flex-direction-column",
		"pl-5",
		"pt-5"
	);
	sidePanel.append(
		createMenuItem(
			"Inbox",
			'<ion-icon class="menu-icon" name="archive-outline"></ion-icon>',
			[
				"mb-2",
				"is-clickable",
				"has-background-info-light",
				"p-2",
				"menu-item",
			]
		),
		createMenuItem(
			"Today",
			'<ion-icon class="menu-icon" name="today-outline"></ion-icon>',
			["mb-2", "is-clickable", "p-2", "menu-item"]
		),
		// abhi himmat nahi ho rahi isko implement karne ki
		// createMenuItem(
		// 	"Filters",
		// 	'<ion-icon class="menu-icon" name="pricetags-outline"></ion-icon>',
		// 	["mb-2", "is-clickable", "p-2", "menu-item"]
		// ),
		projectHeading
	);
	iconContainer.addEventListener("click", () => {
		const input = document.createElement("input");
		input.classList.add("input", "mt-2");
		input.setAttribute("placeholder", "Enter project name");
		sidePanel.append(input);
		input.addEventListener("keydown", ({ code }) => {
			if (code === "Enter") {
				const projectName = input.value;
				console.log(projectName);
				input.remove();
				sidePanel.append(
					createMenuItem(
						projectName,
						'<ion-icon name="rocket-outline"></ion-icon>',
						["is-clickable", "p-2", "menu-item", "is-project"]
					)
				);
				addProject(projectName.replace(/ /g, "-"));
			}
		});
	});
	return sidePanel;
}
