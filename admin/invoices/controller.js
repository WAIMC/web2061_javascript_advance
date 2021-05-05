
// setup element for file
let id = '';
// link server json
var url = ' http://localhost:3000/orders';

// get data category from json server
getAPI(url);
const table_arr = document.querySelector("#table_arr");
const data_arr = (element)=>{
    const output = `
    <tr data-id="${element.id}">
        <th scope="row">${element.id}</th>
        <td>${element.customer_name}</td>
        <td>${element.customer_address}</td>
        <td scope="col">${element.customer_email}</td>
        <td>${element.customer_phone_number}</td>
        <td>${element.created_date}</td>
        <td>
            <button onclick="order_detail(${element.id})" class="btn-edit btn-success p-1 border border-light-5 rounded m-auto" data-toggle="collapse" data-target="#multiCollapse${element.id}" aria-expanded="false" aria-controls="multiCollapse${element.id}" >Detail</button>
        </td>
        <td>
            <a href="" class="btn-del btn-danger p-1 border border-light-5 rounded m-auto">Delete</a>
        </td>
    </tr>
    <tr>
    <td colspan="8">
        <div class="collapse multi-collapse" id="multiCollapse${element.id}">
            <div class="card card-body">
                <table id="table-detail${element.id}" class="table table-bordered table-hover table-striped table-primary text-danger text-center">
                    <thead class="bg-dark">
                        <tr>
                            <th scope="col">ID Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Order Statuses</th>
                            <th>Select Status</th>
                        </tr>
                    </thead>
                    <tbody> 
                    </tbody>
                </table>
            </div>
        </div>
    </td>
    </tr>
    `;
    table_arr.insertAdjacentHTML('beforeend',output);
    // delete data
    const btn_delete = document.querySelector(`[data-id='${element.id}']  .btn-del`);
    btn_delete.addEventListener("click",(e)=>{
        e.preventDefault();
        Swal.fire({
            title: 'Do you want to delete this order?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No, i'm not sure !`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteAPI(url,element.id);
                deleteDetail(element.id);
              Swal.fire('Delete!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    });
    // edit status
    const btn_edit = document.querySelector(`[data-id='${element.id}']  .btn-edit`);
    btn_edit.addEventListener("click",(e)=>{
        id = element.id;
        e.preventDefault();
    })
}

//order detail
function order_detail(order_id){
    var url_detail = "http://localhost:3000/order_detail?order_id="+order_id;
    fetch(url_detail)
    .then(response=>response.json())
    .then(data=>{
        var content_detail = '';
        data.forEach(element => {
            var status = "";
            if(element.status==1){
                status="Awaiting Fulfillment"
            }else if(element.status==2){
                status="Awaiting Shipment"
            }else if(element.status==3){
                status = "completed"
            }
            content_detail +=`
            
            <form class="form_status${element.id}">
            <tr style="color: #f0643b!important;" data-id-detail="${element.id}">
                <th scope="row" >${element.product_id}</th>
                <td>${element.quantity}</td>
                <td>${element.unit_price}</td>
                <td>${status}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle text-dark" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span style="color:black;">Select Status</span> 
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item text-danger" onclick="edit_status(${element.order_id},${element.product_id},${element.quantity},${element.unit_price},1,${element.id})" href="">Awaiting Fulfillment</a>
                            <a class="dropdown-item text-warning" onclick="edit_status(${element.order_id},${element.product_id},${element.quantity},${element.unit_price},2,${element.id})" href="">Awaiting Shipment</a>
                            <a class="dropdown-item text-info" onclick="edit_status(${element.order_id},${element.product_id},${element.quantity},${element.unit_price},3,${element.id})" href="">completed</a>
                        </div>
                    </div>
                </td>
            </tr>
            </form>
            `
        });
        document.querySelector("#table-detail"+order_id).insertAdjacentHTML('beforeend',content_detail);
        // edit status
        edit_status = function(id_order,product_id,quantity,unit_price,status_detail,id_detail){
            //alert("id status :" +status_detail + "id detail :"+id_detail);
            const giveData = {
                order_id:id_order,
                product_id:product_id,
                quantity:quantity,
                unit_price:unit_price,
                status:status_detail
            }
            updateAPI('http://localhost:3000/order_detail',giveData,id_detail);
        }
        
    });
    //     const urlParams = new URLSearchParams(window.location.search);
        // id = urlParams.get('id');
        
}





