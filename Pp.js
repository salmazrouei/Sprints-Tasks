import Product from "./product.js";
import CartLine from "./CartLine.js";
import Cart from "./cart.js";

const getProductsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("products") || []);
};

const getCartObject = () => {


  const products = getProductsFromLocalStorage();
  const cart = new Cart([]);
  
  products.forEach((item) => {
    const product = new Product(item.productName, item.price);
    const cartLine = new CartLine(item.id, product, item.quantity);
    cart.pushToCart(cartLine);
  });

  return cart;
};

const getProductsArr = () => {


  const productsArr = [];
  cart.cartList.forEach((cartLineObj) => {
    const tempObj = {
      id: cartLineObj.id,
      productName: cartLineObj.product.productName,
      price: cartLineObj.product.price,
      quantity: cartLineObj.quantity,
    };

    productsArr.push(tempObj);
  });

  return productsArr;
};

const updateLocalStorage = () => {
  const productsArr = getProductsArr();
  localStorage.setItem("products", JSON.stringify(productsArr));
};

window.incQuantity = (index) => {
  cart.cartList[index].incQuantity();


  updateLocalStorage();

  renderHTML();
};

window.decQuantity = (index) => {
  let productQuantity = cart.cartList[index].quantity;
  if (productQuantity > 1) {
    cart.cartList[index].decQuantity();
  }


  updateLocalStorage();

  renderHTML();
};

window.removeProduct = (index) => {
  cart.removeCartLine(index);


  updateLocalStorage();

  renderHTML();
};

const createProductHTMLRow = (productObj, index) => {
  return `
  <tr>
    <td class="align-middle"><img src="img/${
      productObj.product.productName
    }.jpg" alt="" style="width: 50px;"> ${productObj.product.productName}</td>
    <td class="align-middle">$${productObj.product.price}</td>
    <td class="align-middle">
        <div class="input-group quantity mx-auto" style="width: 100px;">
            <div class="input-group-btn">
                <button type="button" class="btn btn-sm btn-primary btn-minus" onclick="window.decQuantity(${index})">
                <i class="fa fa-minus"></i>
                </button>
            </div>
            <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value="${
              productObj.quantity
            }">
            <div class="input-group-btn">
                <button type="button" class="btn btn-sm btn-primary btn-plus" onclick="incQuantity(${index})">
                    <i class="fa fa-plus"></i>
                </button>
            </div>
        </div>
    </td>
    <td class="align-middle">$${productObj.calculateTotal()}</td>
    <td class="align-middle"><button class="btn btn-sm btn-danger" type="button" onclick="removeProduct(${index})"><i class="fa fa-times"></i></button></td>
  </tr>`;
};

const renderHTML = () => {
  const productsTbody = document.getElementById("products");
  const subTotal = document.getElementById("sub-total");
  const shipping = document.getElementById("shipping");
  const total = document.getElementById("total");


  productsTbody.innerHTML = "";
  subTotal.textContent = "";
  shipping.textContent = "";
  total.textContent = "";


  cart.cartList.forEach((productObj, index) => {
    productsTbody.innerHTML += createProductHTMLRow(productObj, index);
  });


  subTotal.textContent = `$${cart.calculateSubTotal()}`;
  shipping.textContent = `$${cart.calculateShipping()}`;
  total.textContent = `$${cart.calculateCartTotal()}`;
};

const cart = getCartObject();
renderHTML();