const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

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
        const h4 = document.createElement("h4");
        h4.textContent = cat;
        document.querySelector("main").appendChild(h4);

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

//function getProduct() {
//    fetch("https://kea-alt-del.dk/t5/api/product")
//        .then(function (response) {
//            return response.json()
//        })
//        .then(function (data) {
//            showData(data)
//        })
//}


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

    if (!dish.vegetarian) {
        clone.querySelector("img.veg").remove();
    }
    if (!dish.soldout) {
        clone.querySelector(".psold").remove();
    }

    clone.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });

    //    clone.querySelector("p.discount").textContent = dish.discount;
    //    clone.querySelector("p.price").textContent = dish.price + " dkk";

    const parent = document.querySelector(`#${dish.category}`);
    parent.appendChild(clone)
}

function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".alcohol span").textContent = data.alcohol;
//    modal.querySelector(".all span").textContent = data.allergens[1];
    modal.querySelector(".modal-image").src = "https://kea-alt-del.dk/t5/site/imgs/" + "large/" + data.image + ".jpg";
    if (data.discount) {
        modal.querySelector("h3.modal-price span").textContent = data.price;
        modal.querySelector("h3.modal-price").style.display = "block";
        modal.querySelector("h2.modal-discount span").textContent = Math.round(data.price - data.price * data.discount / 100);
        modal.querySelector("img.modal-sale").style.display = "block";
    } else {
        modal.querySelector("h3.modal-price").style.display = "none";

        modal.querySelector("h2.modal-discount span").textContent = data.price
        modal.querySelector("img.modal-sale").style.display = "none";
    }

    if (!data.vegetarian) {
        modal.querySelector("img.modal-veg").style.display = "none";
    }
    if (!data.soldout) {
        modal.querySelector("img.modal-sold").style.display = "none";
    }
    if (!data.alcohol) {
        modal.querySelector(".alcohol").style.display = "none";
    }
    //...
    modal.classList.remove("hide");
}
