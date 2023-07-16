export function createMenuItem(name, icon, classes) {
	const container = document.createElement("div");
	container.classList.add(...classes);
	container.innerHTML = `
    <span class="icon-text">
        <span class="icon has-text-info is-size-5">
            ${icon}
        </span>
        <span class="is-size-6 has-text-weight-semibold">${name}</span>
    </span>`;
	container.setAttribute("data-value", name.replace(/ /g, "-"));
	if (container.classList.contains("is-project")) {
		container.innerHTML +=
			'<ion-icon class="delete-project" name="close-sharp"></ion-icon>';
        container.classList.add("is-flex", "is-justify-content-space-between", "is-align-items-center")
        container.querySelector(".delete-project").addEventListener("click", ()=>{
            
        })
	}
	container.addEventListener("click", () => {
		document
			.querySelector(".side-panel")
			.querySelector(".has-background-info-light")
			.classList.remove("has-background-info-light");
		container.classList.add("has-background-info-light");
	});
	return container;
}
