function resetCart(){
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
}



fetch('http://localhost:3000/products')
.then(Response=>Response.json())
.then(data=>{
    get_arr_local = JSON.parse(localStorage.getItem("productsInCart"));
    var i =0;
    var total = 0;
    var content_item_cart = '';
    var get_item_product = [];
    var get_items_product = [];
    data.forEach(element => {
        if(get_arr_local[element.id].quantity>0){
            content_item_cart += `
            <tr>
                <td> ${element.name} <strong> × ${get_arr_local[element.id].quantity}</strong></td>
                <td> $${parseInt(get_arr_local[element.id].quantity) * parseInt(element.price)}</td>
            </tr>
            `;
            get_item_product={product_id:element.id,quantity:parseInt(get_arr_local[element.id].quantity),unit_price:element.price};
            get_items_product.push({product_id:element.id,quantity:parseInt(get_arr_local[element.id].quantity),unit_price:element.price}); 
            total+=parseInt(get_arr_local[element.id].quantity) * parseInt(element.price);
            i++;
        }
    });
    document.querySelector("#subtotal").innerHTML="$"+total;
    total =total+5;
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
    document.querySelector("#body_order").innerHTML = content_item_cart;


    // post api order
    var order_detail = document.querySelector("#sub");
    
    order_detail.addEventListener("click",(e)=>{
        e.preventDefault();
        if(document.querySelector('input[name="customer_name"]').value==0){
            alert("input your name !");
        }else if(document.querySelector('input[name="customer_address"]').value==0){
            alert("input your address !");
        }else if(document.querySelector('input[name="customer_email"]').value==0){
            alert("input your email !");
        }else if(document.querySelector('input[name="customer_phone_number"]').value==0){
            alert("input your phone !");
        }else{
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Proceed To Order Complete !',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
                var date = new Date;
                fetch('http://localhost:3000/orders', {
                    method:"POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customer_name:document.querySelector('input[name="customer_name"]').value,
                        customer_address:document.querySelector('input[name="customer_address"]').value,
                        customer_email:document.querySelector('input[name="customer_email"]').value,
                        customer_phone_number:document.querySelector('input[name="customer_phone_number"]').value,
                        created_date:date
                    })
                })
                .then(Response=>Response.json())
                .then(data=>{
                    get_items_product.forEach(element => {
                        fetch('http://localhost:3000/order_detail', {
                        method:"POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            order_id:data.id,
                            product_id:element.product_id,
                            quantity:element.quantity,
                            unit_price:element.unit_price,
                            status:1
                        })
                        });
                    });
                })
                .then(resetCart());
          });
        }
    });
});


