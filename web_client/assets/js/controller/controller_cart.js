
fetch('http://localhost:3000/products')
    .then(Response=>Response.json())
    .then(data=>{
        get_arr_local = JSON.parse(localStorage.getItem("productsInCart"));
        var i =0;
        var total = 0;
        var content_item_cart = '';
        data.forEach(element => {
            if(get_arr_local[element.id].quantity>0){
                i++;
                content_item_cart += `
                <!-- Start Cart Single Item-->
                <tr>
                    <td class="product_remove"><button href="#" onclick="update_item_cart(${element.id},0)"><i class="fa fa-trash-o"></i></button></td>
                    <td class="product_thumb"><a href=""><img src="assets/images/product/default/home-1/${element.image}" alt=""></a></td>
                    <td class="product_name"><a href="">${element.name}</a></td>
                    <td class="product-price">$${element.price}</td>
                    <td class="product_quantity"><label>Quantity</label> <input onclick="update_item_cart(${element.id},parseInt(value))" name="quantity_${element.id}" min="1" max="100" value="${get_arr_local[element.id].quantity}" type="number"></td>
                    <td class="product_total">$${parseInt(get_arr_local[element.id].quantity) * parseInt(element.price)}</td>
                </tr> <!-- End Cart Single Item-->
                `;
                total+=parseInt(get_arr_local[element.id].quantity) * parseInt(element.price);
            }
        });
        document.querySelector("#subtotal").innerHTML="$"+total;
        total =total+255;
        document.querySelector("#total").innerHTML="$"  + total;
        if(i==0){
            document.querySelector("#test-test").innerHTML = `
                <div class="emptycart-content text-center">
                    <div class="image">
                        <img class="img-fluid" src="assets/images/emprt-cart/empty-cart.png" alt="">
                    </div>
                    <h4 class="title">Your Cart is Empty</h4>
                    <h6 class="sub-title">Sorry Mate... No item Found inside your cart!</h6>
                    <a href="shop-grid-sidebar-left.html" class="btn btn-lg btn-golden">Continue Shopping</a>
                </div>
            `;
        }
        document.querySelector("#items_cart").innerHTML = content_item_cart;
    })

// update quantity
function update_item_cart(id_arr,param){
    // convert param from string to int
    var get_arr_from_local = JSON.parse(localStorage.getItem("productsInCart"));
    param = parseInt(param);
    if(param==null){
        alert("null");
        param = document.querySelector(`input[name="quantity_${id_arr}"]`).value;
    }else{
        param=param;
    }

    // // update quantity
    if(get_arr_from_local[id_arr].quantity > 0){
        if(param==0){
            get_arr_from_local[id_arr].quantity = param;    
        }else{
            get_arr_from_local[id_arr].quantity = param;
        }
    }else{
        get_arr_from_local[id_arr].quantity = param;
    }
    localStorage.setItem("productsInCart",JSON.stringify(get_arr_from_local));
    location.reload();
}
    
    