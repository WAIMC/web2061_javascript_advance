
// load local store
function load_local(){
    // set product in local storage and check local storage empty
    if(localStorage.getItem("productsInCart")===null){
        fetch('http://localhost:3000/products')
        .then(Response=>Response.json())
        .then(data=>{
            console.log(data);
            var cartItems = [];
            data.forEach(element => {
                cartItems[element.id] = {"id_product":element.id,"quantity":0};
            });
            localStorage.setItem("productsInCart",JSON.stringify(cartItems));
            var cart_items  = JSON.parse(localStorage.getItem("productsInCart"));
            // console.log(cart_items[1].id_product);
        })
    }else if(localStorage.getItem("productsInCart")!==null){
        fetch('http://localhost:3000/products')
        .then(Response=>Response.json())
        .then(data=>{
            var i =0;
            var total = 0;
            var check_cart = localStorage.getItem("productsInCart");
            check_cart = JSON.parse(localStorage.getItem("productsInCart"));
            var content_list_card = '';
            data.forEach(element => {
                if(check_cart[element.id].quantity>0){
                    i=i+1;
                    content_list_card += `
                    <li class="offcanvas-cart-item-single">
                        <div class="offcanvas-cart-item-block">
                            <a href="#" class="offcanvas-cart-item-image-link">
                                <img src="assets/images/product/default/home-1/${element.image}" alt="" class="offcanvas-cart-image">
                            </a>
                            <div class="offcanvas-cart-item-content">
                                <a href="#" class="offcanvas-cart-item-link">${element.name}</a>
                                <div class="offcanvas-cart-item-details">
                                    <span class="offcanvas-cart-item-details-quantity">${check_cart[element.id].quantity} x </span>
                                    <span class="offcanvas-cart-item-details-price">$${element.price}</span>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-cart-item-delete text-right">
                            <button onclick="updateQuantity(${check_cart[element.id].id_product},0)" class="offcanvas-cart-item-delete"><i class="fa fa-trash-o"></i></button>
                        </div>
                    </li>
                    `; 
                    total+= parseInt(check_cart[element.id].quantity) * parseInt(element.price);
                }
            });
            document.querySelector("#offcanvas-cart").innerHTML = content_list_card;
            document.querySelector("#subtotal_show_cart").innerHTML = `$ `+total;
            document.querySelector("#quantity_card_product").innerHTML = i;
        });
    }
}

load_local();

// setup element for file
const addModelForm = document.querySelector('.form_add_product');
const editModelForm = document.querySelector('.form_edit_product');
let id = '';
// link server json
var url ="http://localhost:3000/products";

// get data category from json server
getAPI(url);
const list_product = document.querySelector("#list_product");
var i=1;
const data_arr = (element)=>{
    // add html for content one
    const output = `
    <div class="product-default-single-item product-color--golden swiper-slide swiper-slide-active" role="group" aria-label="${i} / 8" style="width: 330px; margin-right: 30px;">
        <div class="image-box">
            <a href="product-details-default.html" class="image-link">
                <img src="assets/images/product/default/home-1/${element.image}" alt="">
                <img src="assets/images/product/default/home-1/${element.image}" alt="">
            </a>
            <div class="action-link">
                <div class="action-link-left">
                    <a onclick="modal_add_card(${element.id})" href="?id_product=${element.id}" data-bs-toggle="modal" data-bs-target="#modalAddcart">Add to Cart</a>
                </div>
                <div class="action-link-right">
                    <a onclick="modal_view_card(${element.id})" href="?id_product=${element.id}" data-bs-toggle="modal" data-bs-target="#modalQuickview"><i class="icon-magnifier"></i></a>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-left">
                <h6 class="title"><a href="product-details-default.html">${element.name}</a></h6>
                <ul class="review-star">
                    <li class="fill"><i class="ion-android-star"></i></li>
                    <li class="fill"><i class="ion-android-star"></i></li>
                    <li class="fill"><i class="ion-android-star"></i></li>
                    <li class="fill"><i class="ion-android-star"></i></li>
                    <li class="empty"><i class="ion-android-star"></i></li>
                </ul>
            </div>
            <div class="content-right">
                <span class="price">$${element.name}</span>
            </div>

        </div>
    </div>
    `;
    
    i++;
    list_product.insertAdjacentHTML('beforeend',output);
}


// update quantity
updateQuantity = function (id_arr,param) {
    // convert param from string to int
    var test = JSON.parse(localStorage.getItem("productsInCart"));
    param = parseInt(param);

    // update quantity
    if(test[id_arr].quantity > 0){
        if(param==0){
            test[id_arr].quantity = param;    
        }else{
            test[id_arr].quantity += param;
        }
    }else{
        test[id_arr].quantity = param;
    }


    localStorage.setItem("productsInCart",JSON.stringify(test));
    load_local();
}

// modal add card and view card
modal_add_card = function(id_product,result){
    var get_url_product_by_id = 'http://localhost:3000/products?id='+id_product;
    fetch(get_url_product_by_id)
    .then(Response=>Response.json())
    .then(data=>{
        // modal add card
        document.querySelector("#modal-add-card").innerHTML = `<img class="img-fluid" src="assets/images/product/default/home-1/${data[0].image}" alt="">`;
        document.querySelector("#button-add-card").innerHTML = `<a href="cart.html?id_product=${data[0].id}">View Cart</a>
                                                                <a href="checkout.html?id_product=${data[0].id}">Checkout</a>`;
        document.querySelector("#modal-add-card-price").innerHTML = `$${data[0].price}`;
        // var url = new URL(window.location.href);
        // var id_cate = url.searchParams.get("id_param");
        if(result){
            updateQuantity(id_product,document.querySelector('input[name="quantity"]').value);
        }else{
            updateQuantity(id_product,1);
        }
        load_local();
    })
}

// modal view card and view card
modal_view_card = function(id_product){
    var get_url_product_by_id = 'http://localhost:3000/products?id='+id_product;
    fetch(get_url_product_by_id)
    .then(Response=>Response.json())
    .then(data=>{
        // view image
        document.querySelector("#list_product_check_out").innerHTML = `
        <div class="product-image-large-image swiper-slide img-responsive">
            <img src="assets/images/product/default/home-1/${data[0].image}" alt="">
        </div>
        `;
        // view content product
        document.querySelector("#view_content_product").innerHTML=`
            <!-- Start  Product Details Text Area-->
                <div class="product-details-text">
                    <h4 class="title">${data[0].name}</h4>
                    <div class="price"><del>$9999999</del>$${data[0].price}</div>
                </div> <!-- End  Product Details Text Area-->
                <!-- Start Product Variable Area -->
                <div class="product-details-variable">
                    <!-- Product Variable Single Item -->
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="variable-single-item ">
                            <span>Quantity</span>
                            <div class="product-variable-quantity">
                                <input min="1" max="100" value="0" name="quantity" type="number">
                            </div>
                        </div>

                        <div class="product-add-to-cart-btn">
                            <a href="#" onclick="modal_add_card(${data[0].id},result=true)" data-bs-toggle="modal" data-bs-target="#modalAddcart">Add To Cart</a>
                        </div>
                    </div>
                </div> <!-- End Product Variable Area -->
                <div class="modal-product-about-text">
                    <p>${data[0].detail}</p>
                </div>
                <!-- Start  Product Details Social Area-->
                <div class="modal-product-details-social">
                    <span class="title">SHARE THIS PRODUCT</span>
                    <ul>
                        <li><a href="#" class="facebook"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="#" class="twitter"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#" class="pinterest"><i class="fa fa-pinterest"></i></a></li>
                        <li><a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a></li>
                        <li><a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a></li>
                    </ul>
                    
                </div> <!-- End  Product Details Social Area-->
        `;

        load_local();
    })
}
