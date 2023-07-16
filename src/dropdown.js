export function createDropdown({ name, options, classes, selected }) {
	const dropdown = document.createElement("div");
	const trigger = document.createElement("div");
	const dropdownMenu = document.createElement("div");
	const dropdownContent = document.createElement("div");

	dropdownContent.classList.add("dropdown-content");
	dropdownMenu.classList.add("dropdown-menu");
	dropdownMenu.id = "dropdown-menu";
	dropdownMenu.setAttribute("role", "menu");
	dropdown.classList.add(...classes);
	trigger.classList.add("dropdown-trigger");
	trigger.innerHTML = `<button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>${name}</span>
        <span class="icon is-small">
            <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
    </button>`;

	for (let option of options) {
		const item = document.createElement("a");
		item.href = "#";
		item.classList.add("dropdown-item");
		if (selected === option) item.classList.add("is-active");
		item.innerText = option;
		dropdownContent.appendChild(item);
	}

	dropdownMenu.appendChild(dropdownContent);
	dropdown.append(trigger, dropdownMenu);

	return dropdown;
}
