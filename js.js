//elements
const fooods = document.querySelector("#foods");
const items = document.querySelector("#items");
const itemsClass = document.querySelectorAll(".items");
const cartEl = document.querySelector("#cart");

const cartElempty = document

  .querySelector("#cart")
  .querySelector("div")
  .querySelector("div");
let counter = 1;
const cartfoods = [];
let cartfoodsPrice = [];

let html = "";
//get json

const getJson = function (name) {
  return fetch(`http://localhost:3000/${name}`).then((res) => res.json());
};

const showFoods = async function () {
  let counter = 0;
  const res4 = await getJson("drinks");
  res4.forEach((elem, index) => {
    createElements(elem);
  });
  fooods.insertAdjacentHTML(
    "afterbegin",
    "<div  id=div data-param=4>نوشیدنی</div>"
  );
  const res3 = await getJson("Appetizer");
  res3.forEach((elem) => {
    createElements(elem);
  });
  fooods.insertAdjacentHTML(
    "afterbegin",
    "<div id=div data-param=3>پیش غذا</div>"
  );
  const res2 = await getJson("fried");
  res2.forEach((elem) => {
    createElements(elem);
  });
  fooods.insertAdjacentHTML(
    "afterbegin",
    "<div id=div data-param=2>سوخاری</div>"
  );
  const res1 = await getJson("burger");
  res1.forEach((elem) => {
    createElements(elem);
  });
  fooods.insertAdjacentHTML(
    "afterbegin",
    "<div id=div data-param=1>برگر</div>"
  );
  const res0 = await getJson("pizza");
  res0.forEach((elem) => {
    createElements(elem);
  });
  fooods.insertAdjacentHTML(
    "afterbegin",
    `<div id=div data-param=0>پیتزا</div>`
  );
  //addBtn+-Action
  fooods.addEventListener("click", function (e) {
    const clicked = e.target;
    //btn+
    if (clicked.classList.contains("svg1")) {
      let number = e.target.closest("#btn").querySelector("#number");
      +number.textContent++;
      clicked.closest("#container").style.border = "1px solid orange";
      //cartfor++
      //price
      const cartFoodName = clicked.closest("#container");
      const cartFoodPrice = cartFoodName.querySelector("#price").textContent.split(" ").filter(elem => !isNaN(elem));
      cartfoodsPrice.push(+cartFoodPrice.flat());
    
  
      
      const sumcartfoodsPrice = cartfoodsPrice.reduce((previous, current) => {
        return previous + current;
      });
      //foodsthatclicked

      cartfoods.push(cartFoodName);

      const cartfoodsUniqename = new Set(cartfoods);

      cartElempty.classList.add("displaynone");

      //showing in cart
      showtime(cartfoodsUniqename, sumcartfoodsPrice);

      //cartnumber
      counter++;

      cartEl
        .querySelector("div")
        .querySelector("p")
        .querySelector("i").textContent = `(${counter})`;
    } else if (e.target.classList.contains("svg2")) {
      let number = e.target.closest("#btn").querySelector("#number");

      //cartfor--
      const a = cartfoods.indexOf(clicked.closest("#container"));
      cartfoods.splice(a, 1);

      const cartfoodsUniqename = new Set(cartfoods);

      cartfoodsPrice.push(
        +-clicked.closest("#container").querySelector("#price").textContent.split(" ").filter(elem => !isNaN(elem))
      );
      const sumcartfoodsPrice = cartfoodsPrice.reduce((previous, current) => {
        return previous + current;
      });
      //showincart

      if (+number.textContent > 0) {
        +number.textContent--;
        showtime(cartfoodsUniqename, sumcartfoodsPrice);
      }
      if (+number.textContent < 1) {
        +number.textContent === 0;
      }
      counter--;

      if (counter <= 0) counter = 0;
      cartEl.querySelector("p").querySelector("i").textContent = counter;

      if (+number.textContent === 0)
        e.target.closest("#container").removeAttribute("style");
    }
  });
  //itemsAction
  items.addEventListener("click", function (e) {
    if (e.target.classList.contains("items")) {
      const clicked = e.target;
      document
        .querySelector(`[data-param="${clicked.dataset.tag}"]`)
        .scrollIntoView({
          behavior: "smooth",
        });
    }
  });
};
showFoods();

//show foodsItem
let html2 = "";

function createElements(namee) {
  html2 = `
    
        <div id="container">
          <div>
            <img src="${namee.img}" alt="" />
            <h3 id="backparam">${namee.Description}</h3>
          </div>

          <h2>${namee.name}</h2>
          <div id="btn">
              
              <div>
              <button class="btn">
              <svg class="svg1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
              </svg>
            </button >
            <p id="number">0</p>
            <button class="btn">
            <svg class="svg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 11H5V13H19V11Z"></path></svg>
            </button>
            
              </div>
            <p id="price">${namee.price}</p>
          </div>
        </div>
    `;
  fooods.insertAdjacentHTML("afterbegin", html2);
}

//showTags

const cart = document.getElementById("cart");
const headerEl = document.querySelector("header");
const callback = (entries, observer) => {
  if (!entries[0].isIntersecting) {
    cart.classList.add("active");
    items.classList.add("active");
  } else {
    items.classList.remove("active");
    cart.classList.remove("active");
  }
};
const options = {
  root: null,
  threshold: 0,
};
const observer = new IntersectionObserver(callback, options);
observer.observe(headerEl);

//showtime
const showtime = function (data, sumdata) {
  html = "";
  data.forEach((elem) => {
    html += `<div id="inCart"><div>${
      elem.querySelector("#btn").querySelector("div").querySelector("#number")
        .innerHTML
    }</div><div>${
      elem.querySelector("#btn").querySelector("#price").textContent
    }</div><h4>${elem.querySelector("h2").textContent}</h4></div>`;
  });
  document
    .querySelector("#cart")
    .querySelector("div")
    .querySelector("div#lastdiv").innerHTML = html;
  document
    .querySelector("#cart")
    .querySelector("div")
    .querySelector(
      "div#priceShow"
    ).innerHTML = `<div>تومان ${sumdata}<div>مبلغ قابل پرداخت</div></div>`;
};


