var  list= document.getElementById("added-tasks");
var currentTask = document.getElementById("task-input");


arrayIndex=0;

          
function addTask(){
    
    taskEndpoint=`/api/todoList/${currentTask.value}`;
        axios.post(taskEndpoint).then(function(res){
        console.log(res);
        var grabbedTask=res.data[arrayIndex].todo;
        var id = res.data[arrayIndex].id;
        
            list.innerHTML+=`<div style:"block;" id=${id}>
                                <li id="list-${id}">${grabbedTask}</li>
                                <span class="tex-align:center" >
                                    <button type="button" onclick="deleteTask(${id})" class= "btn-primary" >Delete</button>
                                    <button type="button" onclick="completeTask(${id})" class= "btn-primary" >Complete</button>
                                    <button type="button" onclick="editAppear(${id})" class= "btn-primary" >Edit</button>
                                    <input id="edit-field${id}" style="display:none;"  type="text" class="form-control" >
                                    <button id="save-button${id}" style="display:none;"  type="button" onclick="editTask(${id})"  class= "btn-primary" >Save Change</button>
                                </span>
                            </div>`;
            arrayIndex=arrayIndex+1;
            
        }).catch(function(err){
            console.log(err);
        });
}

function editAppear(editIndex){
    var showChangeButton= document.getElementById(`save-button${editIndex}`);
    var showEditField = document.getElementById(`edit-field${editIndex}`);
    showChangeButton.style.setProperty("display","block");
    showEditField.style.setProperty("display","block");
}




function deleteTask(idNumber){
    
    deleteEndpoint=`/api/todoList/delete/${idNumber}`;
        axios.delete(deleteEndpoint).then(function(res){
        console.log(res);
        var deletedId=res.data.id;
        var deletedTask= document.getElementById(deletedId);
        console.log(deletedTask);
        deletedTask.style.setProperty("display","none");
        }).catch(function(err){
            console.log(err);
        });
}


function completeTask(idNumber){
    
    completeEndpoint=`/api/todoList/complete/${idNumber}`;
        axios.get(completeEndpoint).then(function(res){
            console.log(res);
        var completedId=res.data.id;
        var completedTask= document.getElementById(completedId);
        completedTask.style.setProperty("text-decoration","line-through");
        }).catch(function(err){
            console.log(err);
        });
}

function editTask(presentTaskId){
    var editTaskInput=document.getElementById(`edit-field${presentTaskId}`);
    taskEndpoint=`/api/todoList/${editTaskInput.value}/edit/${presentTaskId}`;
        axios.put(taskEndpoint).then(function(res){
            var newEditedTask=res.data.todo;
            var edited=document.getElementById(`list-${presentTaskId}`);
            edited.textContent=res.data.todo;
            var showChangeButton= document.getElementById(`save-button${presentTaskId}`);
            var showEditField = document.getElementById(`edit-field${presentTaskId}`);
            showChangeButton.style.setProperty("display","none");
            showEditField.style.setProperty("display","none");
        }).catch(function(err){
            console.log(err);
        });
}


