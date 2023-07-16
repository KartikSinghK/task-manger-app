import { createDropdown } from "./dropdown.js";
import { format} from "date-fns";
import { setData, removeData } from "./data.js";

function getColor(priority) {
	let color;
	switch (priority) {
		case "high":
			color = "has-text-danger";
			break;
		case "medium":
			color = "has-text-warning";
			break;
		case "low":
			color = "has-text-primary";
			break;
		default:
			color = "has-text-white";
	}
	return color;
}

function close(card) {
	card.querySelector(".card-footer").classList.add("is-hidden");
	card.querySelector(".title").setAttribute("contenteditable", "false");
	card.querySelector(".subtitle").setAttribute("contenteditable", "false");
}
function setDate(parts) {
	return parts != ""
		? format(new Date(parts[0], parts[1] - 1, parts[2]), "eeee, LLL d")
		: "";
}
function applyChanges(data, card) {
	card.querySelector(".title").textContent = data.title;
	card.querySelector(".subtitle").textContent = data.description;
	if (data.tag)
		card.querySelector(".tag-container").firstElementChild.classList.add(
			"tag"
		);
	card.querySelector(".tag-container").firstElementChild.textContent =
		data.tag;
	card.querySelector("ion-icon[name='flag']").classList.remove(
		"has-text-danger",
		"has-text-warning",
		"has-text-primary",
		"has-text-white"
	);
	card.querySelector("ion-icon[name='flag']").classList.add(
		getColor(data.priority)
	);
	let parts = card.querySelector("input[type='date']").value.split("-");
	card.querySelector(".display-date").textContent =
		setDate(parts) || "No due date";
}
export function createCard(
	title,
	description,
	tag,
	priority,
	id,
	date = "",
	project = "defaultProject",
) {
	const data = { title, description, tag, priority, date, project};
	const card = document.createElement("div");
	const cardContent = document.createElement("div");
	const cardFooter = document.createElement("footer");
	let parts = "";
	card.setAttribute("data-projectName", project);
	if (date != "") parts = date.split("-");
	card.classList.add("card", "mb-1", "todo");
	card.id = id;
	cardContent.classList.add("card-content");
	cardFooter.classList.add("card-footer");
	if (title) cardFooter.classList.add("is-hidden");

	cardContent.innerHTML = `
    <div class="content">
        <div class="head is-flex is-align-itmes-center is-justify-content-space-between">
            <div class="is-flex is-align-items-center">
                <input class='mr-2' type="checkbox" >
                <div class="title is-5 task-content " data-placeholder="Task name">${title}</div>
            </div>
            <div class="icon-container">
                <ion-icon class="edit is-size-5 is-clickable mr-2" name="create-outline"></ion-icon>
                <ion-icon class="delete-todo is-size-5 is-clickable has-text-danger" name="trash-outline"></ion-icon>

            </div>
        </div>
        <div class="subtitle is-6 task-content" data-placeholder="Description...">${description}</div>
        <div class="task-info is-flex is-justify-content-space-between is-align-items-center">
            <div class="tag-container">
                <span class= ${tag ? "tag" : ""}>
                    ${tag}
                </span>
            </div>
            <div class="is-flex is-align-items-center is-justified-content-center">
            <ion-icon class=" ${getColor(priority)}" name="flag"></ion-icon>
            <p class="ml-3 has-text-info has-text-weight-bold display-date">${
				setDate(parts) || "No due date"
			}</p>
            </div>
            
        </div>
    </div>`;

	cardFooter.append(
		createDropdown({
			name: "Priority",
			options: ["high", "medium", "low", "none"],
			classes: ["dropdown", "card-footer-item", "priority"],
			selected: priority,
		}),
		createDropdown({
			name: "Tag",
			options: ["School", "Work", "Project", "personal"],
			classes: ["dropdown", "card-footer-item", "Tag"],
			selected: tag,
		})
	);
	cardFooter.innerHTML += `<input class="date card-footer-item" type="date" name="" id="" value=${date}>`;
	cardFooter.innerHTML += `<a href="#" class="cancel card-footer-item has-text-dark has-text-weight-bold">Cancel</a>`;
	cardFooter.innerHTML += `<a href="#" class="save card-footer-item has-text-success has-text-weight-bold">Save</a>`;

	card.append(cardContent, cardFooter);

	// all event listeners
	const dropdowns = [...card.querySelectorAll(".dropdown")];
	for (let dropdown of dropdowns) {
		dropdown.addEventListener("click", (e) => {
			// e.stopPropagation();
			dropdown.classList.toggle("is-active");
		});
		dropdown
			.querySelector(".dropdown-content")
			.addEventListener("click", ({ target }) => {
				console.log("here");
				if (!target.classList.contains("is-active")) {
					const selected = dropdown
						.querySelector(".dropdown-content")
						.querySelector(".is-active");
					if (selected) selected.classList.remove("is-active");
					target.classList.add("is-active");
				}
			});
	}

	card.querySelector(".edit").addEventListener("click", () => {
		card.querySelector(".card-footer").classList.toggle("is-hidden");
		card.querySelector(".title").setAttribute("contentEditable", "true");
		card.querySelector(".subtitle").setAttribute("contentEditable", "true");
	});
	card.querySelector(".delete-todo").addEventListener(
		"click",
		({ target }) => {
			if (target.classList.contains("delete-todo")) {
				removeData(data.project, id);
				card.remove();
			}
		}
	);
	card.querySelector(".card-footer").addEventListener(
		"click",
		({ target }) => {
			if (target.classList.contains("save")) {
				console.log(card.querySelector(".title").textContent);
				if (
					card.querySelector(".title").textContent ===
						card
							.querySelector(".title")
							.getAttribute("data-placeholder") ||
					card.querySelector(".title").textContent === ""
				)
					data.title = "";
				else data.title = card.querySelector(".title").textContent;
				if (data.title) {
					data.description =
						card.querySelector(".subtitle").textContent || "";
					if (
						card.querySelector(
							".priority .dropdown-content .is-active"
						)
					)
						data.priority = card.querySelector(
							".priority .dropdown-content .is-active"
						).textContent;
					else data.priority = "none";
					if (card.querySelector(".Tag .dropdown-content .is-active"))
						data.tag = card.querySelector(
							".Tag .dropdown-content .is-active"
						).textContent;
					else data.tag = "";
					data.date = card.querySelector(".date").value;
					console.log(data);
					applyChanges(data, card);
					setData(data, id);
				} else {
					card.remove();
				}

				close(card);
			}
			if (target.classList.contains("cancel")) {
				if (!title) card.remove();
				else close(card);
			}
		}
	);
	card.querySelector("input[type='checkbox']").addEventListener(
		"click",
		() => {
			card.querySelector(".title").classList.toggle("done");
		}
	);
	if (title == "") {
		card.querySelector(".title").contentEditable = true;
	}
	if (description == "") {
		card.querySelector(".subtitle").contentEditable = true;
	}
	card.querySelectorAll(".task-content").forEach((div) => {
		div.addEventListener("focusout", () => {
			if (div.textContent === "") {
				div.textContent = div.getAttribute("data-placeholder");
				div.classList.add("has-text-grey-light");
			}
		});
		div.addEventListener("focus", () => {
			if (div.textContent === div.getAttribute("data-placeholder")) {
				div.textContent = "";
				div.classList.remove("has-text-grey-light");
			}
		});
	});
	return card;
}
