const card = document.getElementsByClassName("card"); // card classimdakileri card degiskenimde tutacagim

const btnAdd = document.getElementsByClassName("btn-info"); // buna ayri class name vermemsitim bs5 in classini yazdim

const btnCart = document.querySelector(".btn-cart"); // sadece 1 tane var sepet kismi

const cartList = document.querySelector(".shopping-cart-list");

class Shopping {
  constructor(title, price, image) {
    // cunku tikladigimda (sepete ekleme isleminde) aldigim bilgiler bunlar.
    this.image = image;
    this.title = title;
    this.price = price;
  }
}

class UI {
  addToCart(shopping) {
    const listItem = document.createElement("div"); // div olusturdum
    listItem.classList = "list-item"; // list-item classini ekledim

    listItem.innerHTML = `
            <div class="row align-items-center text-white-50"> 
                <div class="col-md-3">
                    <img src="${shopping.image}" alt="product" class="img-fluid">
                </div>
                <div class="col-md-5">
                    <div class="title">${shopping.title}</div> 
                </div>
                <div class="col-md-2">
                    <div class="price">${shopping.price}</div>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-delete">
                        <i class="fas fa-trash-alt text-danger"></i>
                    </button>
                </div>
        </div>
        `;

        cartList.appendChild(listItem);
  }

  removeCart(){
    let btnRemove= document.getElementsByClassName("btn-delete");
    let self= this; // count olayinda

    for (let i=0; i<btnRemove.length; i++){
        btnRemove[i].addEventListener("click", function(){
            this.parentElement.parentElement.parentElement.remove();
            self.cartCount(); // silindiginde eksilmesi icin counttan bunu kullanmamiz gerekiyor. yoksa eklendigindeki count kaliyordu
        })
    }
  }

  cartCount(){
    let cartListItem=cartList.getElementsByClassName("list-item");
    let itemCount= document.getElementById("item-count");
    itemCount.innerHTML=cartListItem.length;
  }
}

for (let i = 0; i < card.length; i++) { // butona tiklanilan kisim
  btnAdd[i].addEventListener("click", function (e) {
    //console.log(btnAdd[i]); // tikladigim butonlari gormek istedim

    let title = card[i].getElementsByClassName("card-title")[0].textContent;
    //console.log(title); // tikladigim cartlarin isimleri
    let price = card[i].getElementsByClassName("price")[0].textContent;
    let image = card[i].getElementsByClassName("card-img-top")[0].src; // image oldugunda src 

    btnAdd[i].classList.add("disabled"); // bir kere eklendiyse daha tiklanamasin yapiyorum.
    btnAdd[i].textContent="In Card"; // eklendigini butona yazdiriyorum

    let shopping = new Shopping(title, price, image);
    let ui = new UI();


    ui.addToCart(shopping);
    ui.removeCart();
    ui.cartCount();
    e.preventDefault(); // linke tikladigimizda bir yere gitmemesi icin yaptik.
  });
}

// cart toggle
function cartToggle() {
  btnCart.addEventListener("click", function () {
    cartList.classList.toggle("d-none");
  });
}

cartToggle();
