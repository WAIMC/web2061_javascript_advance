
// setup element for file
const addModelForm = document.querySelector('.form_add_product');
const editModelForm = document.querySelector('.form_edit_product');
let id = '';

// link server json
var url ="http://localhost:3000/products";

// get data category from json server
getAPI(url);
const table_arr = document.querySelector("#table_product");
const data_arr = (element)=>{
    var test ="../../web_client/assets/images/product/default/home-1/"+element.image;
    const output = `
    <tr data-id='${element.id}'>
        <th scope="row">${element.id}</th>
        <td>${element.name}</td>
        <td>$${element.price}</td>
        <td><img id="img_img" width="50px" height="50px" src="${test}" alt=""></td>
        <td>
            <button data-toggle="modal" data-target="#update_product" class="btn-edit btn-success p-1 border border-light-5 rounded m-auto">Update</button>
        </td>
        <td>
            <a href="" class="btn-del btn-danger p-1 border border-light-5 rounded m-auto">Delete</a>
        </td>
        </tr>
    `;
    table_arr.insertAdjacentHTML('beforeend',output);
    // delete data
    const btn_delete = document.querySelector(`[data-id='${element.id}']  .btn-del`);
    btn_delete.addEventListener("click",(e)=>{
        e.preventDefault();
        Swal.fire({
            title: 'Do you want to delete this category?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No, i'm not sure !`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteAPI(url,element.id);
              Swal.fire('Delete!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    });
    
    const btn_edit = document.querySelector(`[data-id='${element.id}']  .btn-edit`);
    btn_edit.addEventListener('click',(e)=>{
        e.preventDefault();
        id=element.id;
        get_cate_id();
        setTimeout(()=>{
            //var x = document.querySelector("#id_cate").selectedIndex;
            // var x = document.getElementById("id_cate").selectedIndex=element.cate_id;
            // var y = document.getElementById("id_cate").options;
            // alert("Index: " + y[x].index + " is " + y[x].text);
            document.getElementById("id_cate").selectedIndex=element.cate_id;
        },1000);
        editModelForm.id_product.value=element.id;
        editModelForm.name_product.value=element.name;
        editModelForm.price.value=element.price;
        editModelForm.detail.value=element.detail;
        editModelForm.edit_image.value=element.image;
    })
}

// add data
addModelForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    var input_image = document.querySelector(".input-image");
    var files = input_image.files;
    var fl = files.length;
    var i =0;
    var outputImage ='';
    while(i<fl){
        var file = files[i];
        outputImage = file.name;
        i++;
    }
    const giveData = {
        name:addModelForm.name_product.value,
        cate_id:addModelForm.id_cate.value,
        price:addModelForm.price.value,
        detail:addModelForm.detail.value,
        image:outputImage
    }
    postAPI(url,giveData)
})

// edit form
editModelForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    var input_image = document.querySelector(".edit-image");
    var files = input_image.files;
    var fl = files.length;
    var i =0;
    var outputImage ='';
    while(i<fl){
        var file = files[i];
        outputImage = file.name;
        i++;
    }
    if(outputImage.length==0){
        img_last = editModelForm.edit_image.value;
    }else{
        img_last=outputImage;
    }
    const giveData = {
        name:editModelForm.name_product.value,
        cate_id:editModelForm.id_cate.value,
        price:editModelForm.price.value,
        detail:editModelForm.detail.value,
        image:img_last
    }
    updateAPI(url,giveData,id);
})


// select id category
function get_cate_id(){
    fetch('http://localhost:3000/categories')
    .then(response=>response.json())
    .then(data=>{
        var content_category='';
        data.forEach(element => {
            content_category+=`
            <option id="selected${element.id}" value="${element.id}">${element.name_category}</option>
            `
        });
        document.querySelector(`#id_cate`).innerHTML = content_category;
        document.querySelector(`.edit_cate`).innerHTML = content_category;
    })
}

