// url, giveData

// fetch api
function fetchAPI(url,option,request_data){
    fetch(url,option)
    .then(response=>response.json())
    .then(data=>{
        if(request_data){
            data.forEach(element => {
                data_arr(element);
            });
        }
    })
}



// get api
function getAPI(url){
    const request_data =true;
    const option ={
        method:"get"
    };
    fetchAPI(url,option,request_data);
}

// post api (insert api)
function postAPI(url,giveData){
    const request_data =false;
    const option = {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giveData),
      };
    fetchAPI(url,option,request_data);
}

// delete api
function deleteAPI(url,element){
    const request_data =false;
    const option ={
        method:"DELETE"
    };
    url+=`/`+element;
    fetchAPI(url,option,request_data);
}

// edit api (update api)
function updateAPI(url,giveData,element){
    const request_data =false;
    const option = {
        method :'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(giveData)
    }
    url+=`/`+element;
    fetchAPI(url,option,request_data);
}


