// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

   var searchTask = req.query.q;
   console.log(searchTask);
   var foundTasks = []
   for (var i = 0; i < todos.length; i++) {
     if (todos[i].task.toLowerCase() == searchTask) {
       foundTasks.push(todos[i]); 
     }
   }
   var listOfFoundTasks = {todos: foundTasks};
   res.json(listOfFoundTasks);


});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   
  function genNewId() {
      var lastId = todos[todos.length-1]._id;
      lastId++;
      return lastId;
   }

   var task = req.body.task;
   var description= req.body.description;

   var newTask = {
    _id: genNewId(),
    task: task,
    description: description  
   }
   todos.push(newTask);
   res.json(newTask);

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  console.log(req.params);
  var id = req.params.id;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id == id) {
      var result = todos[i];
    }
  }
  res.json(result);
    
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var id = req.params.id;
   var updatedTask = req.body.task;
   var updatedDesc = req.body.description;
   
   
    for (var i = 0; i < todos.length; i++) {
      if (todos[i]._id == id) {
        todos[i].task = updatedTask;
        todos[i].description = updatedDesc;
        var updatedTodo = todos[i]; 
      }
   }
   res.json(updatedTodo);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

   var id = req.params.id;
   
   for (var i = 0; i < todos.length; i++) {
     if (todos[i]._id == id) {
       todos.splice(i, 1);
     }
   }
   
   res.json(todos);

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
