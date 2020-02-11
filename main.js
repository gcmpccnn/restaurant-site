fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(categories)


function categories(data) {
    data.forEach(function (cat) {
        const link = document.createElement("a");
        link.setAttribute("href", `#${cat}`);
        link.textContent = cat;
        document.querySelector("nav").appendChild(link)

        const section = document.createElement("section");
        section.id = cat;
        const h2 = document.createElement("h2");
        h2.textContent = cat;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);
    })
    getProducts();
}



function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })
}


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
    if (dish.discount) {
        clone.querySelector("h3.price span").textContent = dish.price;
        clone.querySelector("h2.discount span").textContent = Math.round(dish.price - dish.price * dish.discount / 100);
    } else {
        clone.querySelector("h3.price").remove();
        clone.querySelector("h2.discount span").textContent = dish.price
        clone.querySelector("img.sale").remove();
    }

    //    clone.querySelector("p.discount").textContent = dish.discount;
    //    clone.querySelector("p.price").textContent = dish.price + " dkk";

    const parent = document.querySelector(`#${dish.category}`);
    parent.appendChild(clone)
}
