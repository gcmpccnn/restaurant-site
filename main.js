fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        showData(data)
    })



function showData(jsonData) {
    console.log(jsonData)

    jsonData.forEach(showDish)
}

function showDish(dish) {
const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    clone.querySelector("h1.name").textContent = dish.name;
    clone.querySelector("p.description").textContent = dish.shortdescription;

    const parent = document.querySelector("main");
    parent.appendChild(clone)
}
