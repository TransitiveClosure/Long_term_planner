function update_global_tasks(class_name) {
    document.querySelector(class_name).innerHTML = "";
}

function save_global_tasks_state() {
    root = document.querySelector(".planning__list_tasks.global_tasks")
    json_global_tasks = parse_list_tree(root)
    console.log(json_global_tasks)
}

function parse_list_tree(element) {
    task_arr = [];
    for(let item of element.children) {
        // curr_node = {};
        
        value1 = item.querySelector("span");
        
        if (value1 == null) {
            continue;
        } 
        // console.log(item)
        // curr_node.
        // curr_node["value"] = value.textContent;
        ul3 = item.querySelector("ul");
        // ul_list = null;
        // if (ul!= null) {
        // ul_list = parse_list_tree(ul);
        // console.log(ul_list)
        // }
        // curr_node["children"] = ul_list;
        task_arr.push({key:"task", value:[{ key: "value", value: value1.textContent}, { key: "children", value:parse_list_tree(ul3)}]});
    }
    return task_arr;
}
update_global_tasks(".planning__list_tasks.global_tasks")
// function update_global_tasks(address) {

// }

// const form = document.querySelector("#add_global_task");
var form = document.getElementById("add_global_task");
function handleForm(event) { 
    event.preventDefault(); 
    if (event.currentTarget.querySelector('input').value == ""){
        return
    }
    
    // let myLi = document.createElement("li");
    // myLi.className = "planning__task" ;
    // let myText = document.createElement("span");
    
    // myText.textContent = event.currentTarget.querySelector('input').value;
    // event.currentTarget.querySelector('input').value = "";
    // // alert(event.currentTarget.querySelector(".planning__button_add").textContent)

    // // alert(form.textContent);
    // let myB1 = document.createElement("button");
    // myB1.textContent = "+";
    // myB1.className = "planning__task__button";
    
    // let myB2 = document.createElement("button");
    // myB2.className = "planning__task__trashbox_button";
    // let trash = document.createElement("img");
    // trash.className = "planning__task__trashbox";
    // trash.src = "images/trashbox.png";
    // myB2.appendChild(trash);
    // let myButtons = document.createElement("div");
    // myButtons.className = "planning__task__buttons"
    // myButtons.appendChild(myB1)
    // myButtons.appendChild(myB2)

    // let mytaskBody = document.createElement("div");
    // mytaskBody.className = "planning__task__entity"
    // mytaskBody.appendChild(myText)
    // mytaskBody.appendChild(myButtons)

    // let myList = document.createElement("ul");
    // myList.className = "planning__list_tasks";
    // let myInput = document.createElement("input");
    // myInput.type="text"
    // myInput.className="planning__input_add_task"
    // myInput.placeholder="Enter task name"
    // let myForm = document.createElement("form");
    // myForm.className = "add_global_task";
    // myForm.appendChild(myInput)
    // myForm.addEventListener('submit', handleForm);
    // myList.appendChild(myForm);

    // myLi.appendChild(mytaskBody);
    // myLi.appendChild(myList);
    if (event.currentTarget.parentElement.className == "planning") {
        myLi = create_task(event.currentTarget.querySelector('input').value, "global_task");
        event.currentTarget.querySelector('input').value = "";
        ul = document.querySelector(".planning__list_tasks.global_tasks");
        ul.appendChild(myLi);
    }
    else
    {
        myLi = create_task(event.currentTarget.querySelector('input').value, "subtasks");
        event.currentTarget.querySelector('input').value = "";
        ul = event.currentTarget.parentElement;
        ul.appendChild(myLi);
    }
    save_global_tasks_state()
} 
form.addEventListener('submit', handleForm);

function add_global_task() {
    json_global_tasks = localStorage.getItem("b1_gt");
    if (json_global_tasks == null) {
        json_global_tasks = []
    }

}

function create_task(input_value, span_class) {
    let myLi = document.createElement("li");
    myLi.className = "planning__task" ;

    let myText = document.createElement("span");
    myText.className = span_class;
    myText.textContent = input_value;
    let myB1 = document.createElement("button");
    myB1.textContent = "+";
    myB1.className = "planning__task__button";
    
    let myB2 = document.createElement("button");
    myB2.className = "planning__task__trashbox_button";
    let trash = document.createElement("img");
    trash.className = "planning__task__trashbox";
    trash.src = "images/trashbox.png";
    myB2.appendChild(trash);
    let myButtons = document.createElement("div");
    myButtons.className = "planning__task__buttons"
    myButtons.appendChild(myB1);
    myButtons.appendChild(myB2);

    let mytaskBody = document.createElement("div");
    mytaskBody.className = "planning__task__entity";
    mytaskBody.appendChild(myText);
    mytaskBody.appendChild(myButtons);

    let myList = document.createElement("ul");
    myList.className = "planning__list_tasks";
    let myInput = document.createElement("input");
    myInput.type="text";
    myInput.className="planning__input_add_task";
    myInput.placeholder="Enter task name";
    let myForm = document.createElement("form");
    myForm.className = "add_global_task";
    myForm.appendChild(myInput);
    myForm.addEventListener('submit', handleForm);
    myList.appendChild(myForm);

    myLi.appendChild(mytaskBody);
    myLi.appendChild(myList);
    return myLi;
}

// form.addEventListener("submit", async (event) => {
//     const formData = new FormData(form);
//     alert(1);
//     formData.append("CustomField", "This is some extra data");
//     alert(1);
//     const response = await fetch("stash.php", {
//     method: "POST",
//     body: formData,
//     });
//     event.preventDefault();
// });
// $("#add_global_task").submit(function(e) {
//     e.preventDefault();
// });
// function(add_gloabal_task())