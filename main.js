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
    clone.querySelector("img.picture").src = "https://kea-alt-del.dk/t5/site/imgs/" + "small/" + dish.image + "-sm.jpg";
    clone.querySelector("p.discount").textContent = dish.discount;
    clone.querySelector("p.price").textContent = dish.price + " dkk";

    const parent = document.querySelector("main");
    parent.appendChild(clone)
}
