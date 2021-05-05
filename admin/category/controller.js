
// setup element for file
const addModelForm = document.querySelector('.form_add_category');
const editModelForm = document.querySelector('.form_edit_category');
let id = '';

// link server json
var url = 'http://localhost:3000/categories';

// get data category from json server
getAPI(url);
const table_arr = document.querySelector("#table_arr");
const data_arr = (element)=>{
    const output = `
    <tr data-id='${element.id}'>
        <th scope="row">${element.id}</th>
        <td>${element.name_category}</td>
        <td>
            <button
            id="btn_update"
            type="button"
            class="btn-edit btn-success p-1 border border-light-5 rounded m-auto"
            data-toggle="modal"
            data-target="#editModal">Update</button>
        </td>
        <td>
        <a
            href=""
            class="btn-del btn-danger p-1 border border-light-5 rounded m-auto"
            >Delete</a
        >
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
        id=element.id;
        e.preventDefault();
        editModelForm.id_category.value=element.id;
        editModelForm.name_category.value=element.name_category;
    })
}

// add data
addModelForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const giveData = {
        name_category:addModelForm.name_category.value
    }
    postAPI(url,giveData)

})

// edit form
editModelForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const giveData = {
        name_category:editModelForm.name_category.value
    }
    updateAPI(url,giveData,id);
})