let btn_add = document.querySelector('.one_left button')
let box_modal = document.querySelector('.box_modal')
let form_new_info = document.querySelector('.form_new_info')
let modal_btn_add = document.querySelector('.modal_btn_add')
let tbody = document.querySelector('.tbody')
let box_dbl_modal = document.querySelector('.box_dbl_modal')
let dbl_form_new_info = document.querySelector('.dbl_form_new_info')
let modal_btn_remove = document.querySelector('.modal_btn_remove')
let plit = document.querySelector('.plit')
let thead = document.querySelector('.thead')
let table_btn = document.querySelector('.table')

table_btn.classList.add('color_blue')

box_modal.classList.add('none')
box_dbl_modal.classList.add('none')

let base_url = 'http://localhost:8080'


function fetchch(smth) {
    fetch(base_url + '/users')
        .then((res) => res.json())
        .then(res => reload(res))
}

    
fetchch()


btn_add.onclick = () => {
    box_modal.classList.remove('none')
}


form_new_info.onsubmit = (e) => {
    e.preventDefault()

    box_modal.classList.add('none')

    let user = {
}

    let fm = new FormData(form_new_info)

    fm.forEach((value, key) => {
        user[key] = value
    })

    fetch(base_url + '/users', {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }).then (res => {
        if(res.status == 200 || res.status == 201){
            fetchch()
        }
    })


    form_new_info.reset()
    
}



function reload(arr) {
    tbody.innerHTML = ""
    let tds = []
    

    for(let item of arr){
        
        let tr = document.createElement('div')
        tr.classList.add('tr')

            
        let td1 = document.createElement('p')
        let td2 = document.createElement('p')
        let td3 = document.createElement('p')
        let td4 = document.createElement('p')
        let td5 = document.createElement('p')
         
        td1.classList.add('td1')
        td2.classList.add('td2')
        td3.classList.add('td3')
        td4.classList.add('td4')
        td5.classList.add('td5')
        

        td1.innerHTML = item.zagolovok
        td2.innerHTML = item.opisaniye
        td3.innerHTML = item.date
        td4.innerHTML = item.time
        td5.innerHTML = item.options

        if(td5.innerHTML == 'done'){
            td5.style.color = 'green'
        } else if(td5.innerHTML == 'progress'){
            td5.style.color = 'blue'
        } else {
            td5.style.color = 'red'
        }

        if(thead.classList.contains('none')) {
            tr.classList.add('tr_plit')
            tds.push(td1, td2, td3, td4, td5)
            tds.forEach(td=>{
                td.classList.add('td')
            })
            tbody.classList.add('body_plit')
            td1.style.fontSize = '28px'
            td2.style.color = 'silver' 
            

        }

        tbody.append(tr)
        tr.append(td1, td2, td3, td4, td5)
         
        

        tr.ondblclick = () => {
            box_dbl_modal.classList.remove('none')

            dbl_zagolovok.setAttribute('value', item.zagolovok)
            dbl_opisaniye.setAttribute('value', item.opisaniye)
            dbl_date.setAttribute('value', item.date)
            dbl_time.setAttribute('value', item.time)
            dbl_options.setAttribute('value', item.options)


            dbl_form_new_info.onsubmit = (e) => {
                e.preventDefault()

                fetch(base_url + '/users/'+ item.id, {
                    method: "put",
                    body: JSON.stringify({
                        zagolovok: dbl_zagolovok.value, 
                        opisaniye: dbl_opisaniye.value,
                        date: dbl_date.value,
                        time: dbl_time.value,
                        options: dbl_options.value}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then (res => {
                    if(res.status == 200 || res.status == 201){
                        fetchch()
                    }
                })

                box_dbl_modal.classList.add('none')
                
                dbl_form_new_info.reset()


            }

            modal_btn_remove.onclick = () => {
                fetch(base_url + '/users/'+ item.id, {
                    method: "delete",
                })
                .then(res => {
                    if(res.status == 200 || res.status == 201){
                        tr.remove()
                    }
                });
                box_dbl_modal.classList.add('none')
                
            }


        }   
        
    }
}


plit.onclick = () => {
    thead.classList.add('none')
    fetchch()
    table_btn.classList.remove('color_blue')
    plit.classList.add('color_blue')
}

table_btn.onclick = () => {
    thead.classList.remove('none')
    fetchch()
    plit.classList.remove('color_blue')
    table_btn.classList.add('color_blue')
}

























// let form = document.forms.formData
// let inp = form.querySelector('input')
// let box = document.querySelector('.box')






// form.onsubmit = (e) => {
//     e.preventDefault()

//     let user = {
//         name: inp.value
//     }

    // fetch(base_url + '/users', {
    //     method: "post",
    //     body: JSON.stringify(user),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
    // .then(res => res.json())
    // .then((res) => 7)

//     let p = document.createElement('p')
//     p.innerHTML = inp.value
//     box.append(p)
    
// }


