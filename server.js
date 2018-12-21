var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var arrayId=0;
var todoList = [];
 

app.post('/api/todoList/:addedTask',function(req,res,next){
    var addedTask = req.params.addedTask;
    todoList.push({
        id: arrayId,
        todo: addedTask
    });
    arrayId= arrayId+1;
    res.send(todoList);
});

app.delete('/api/todoList/delete/:id', function(req, res) {
    const taskDeleted = todoList.find(function(o){
        return o.id ===parseInt(req.params.id);
    });
    if (!taskDeleted) return res.status(404).send('the task with the given ID was not found');
    const index = todoList.indexOf(taskDeleted);
    todoList.splice(index,1);
    res.send(taskDeleted);
    
    
 });

 app.get('/api/todoList/complete/:id', function(req, res) {
    const taskComplete = todoList.find(function(o){
        return o.id ===parseInt(req.params.id);
    });
    if (!taskComplete) return res.status(404).send('the task with the given ID was not found');
    res.send(taskComplete);
 });


 app.put('/api/todoList/:editTask/edit/:id', function(req, res) {
    var editedTask = req.params.editTask;
    var taskEdit = todoList.find(function(o){
        if(o.id ===parseInt(req.params.id)){
           return o.todo=editedTask;
        };
    });
    if (!taskEdit) return res.status(404).send('the task with the given ID was not found');
    res.send(taskEdit); 
 });


app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
});
app.use(express.static('public'));