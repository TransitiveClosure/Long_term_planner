function update_global_tasks(class_name) {
    document.querySelector(class_name).innerHTML = "";
    let json_string = localStorage.getItem("global_tasks");
    let json_global_tasks = JSON.parse(json_string);
    let root = document.querySelector(".planning__list_tasks.global_tasks");
    for (let child of parse_global_task_json(json_global_tasks, "global_task", "subtasks")) {
        root.appendChild(child);
    }
}

function parse_global_task_json(element, span_class, child_span_class){
    let list_tasks = []
    for(let item of element) {
        let span = create_task_span(item["value"], span_class);
        let children_list = create_tasks_list();
        if (item["children"].length != 0) {
            for (let child of parse_global_task_json(item["children"])) {
                children_list.appendChild(child, child_span_class, child_span_class);
            }
        }
        task = create_task_element(span, children_list)
        list_tasks.push(task)
    }
    return list_tasks
}

function save_global_tasks_state() {
    let root = document.querySelector(".planning__list_tasks.global_tasks");
    let json_global_tasks = parse_list_tree(root);
    // console.log(json_global_tasks)
    localStorage.setItem("global_tasks", JSON.stringify(json_global_tasks));
}

function remove_task(event){
    event.currentTarget.parentElement.parentElement.parentElement.remove();
    save_global_tasks_state();
}

function parse_list_tree(element) {
    let task_arr = [];
    for(let item of element.children) {
        let curr_node = {};
        
        let value = item.querySelector("span");
        
        if (value == null) {
            continue;
        } 
        curr_node["value"] = value.textContent;
        let ul = item.querySelector("ul");
        let ul_list = parse_list_tree(ul);
       
        curr_node["children"] = ul_list;
        task_arr.push(curr_node);
    }
    return task_arr;
}
update_global_tasks(".planning__list_tasks.global_tasks")

var form = document.getElementById("add_global_task");
function handleForm(event) { 
    event.preventDefault(); 
    if (event.currentTarget.querySelector('input').value == ""){
        return
    }
    
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
    save_global_tasks_state();
} 
form.addEventListener('submit', handleForm);

function add_global_task() {
    json_global_tasks = localStorage.getItem("b1_gt");
    if (json_global_tasks == null) {
        json_global_tasks = []
    }

}

function create_task(input_value, span_class) {
    return create_task_element(create_task_span(input_value, span_class), create_tasks_list())
}

function create_task_span(input_value, span_class) {
    let myText = document.createElement("span");
    myText.className = span_class;
    myText.textContent = input_value;
    return myText;
}

function create_task_buttons() {
    let myB1 = document.createElement("button");
    myB1.textContent = "+";
    myB1.className = "planning__task__button";
    
    let myB2 = document.createElement("button");
    myB2.className = "planning__task__trashbox_button";
    let trash = document.createElement("img");
    trash.className = "planning__task__trashbox";
    trash.src = "images/trashbox.png";
    myB2.appendChild(trash);
    myB2.addEventListener("click", remove_task)
    let myButtons = document.createElement("div");
    myButtons.className = "planning__task__buttons"
    myButtons.appendChild(myB1);
    myButtons.appendChild(myB2);
    return myButtons;
}

function create_task_body(myText, myButtons) {
    let myTaskBody = document.createElement("div");
    myTaskBody.className = "planning__task__entity";
    myTaskBody.appendChild(myText);
    myTaskBody.appendChild(myButtons);
    return myTaskBody;
}

function create_tasks_list() {
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
    return myList;
}

function create_task_element(taskText, myList) {
    let myLi = document.createElement("li");
    myLi.className = "planning__task" ;
    myLi.appendChild(create_task_body(taskText, create_task_buttons()));
    myLi.appendChild(myList);
    return myLi;

}