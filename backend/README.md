# Backend Documentation

### Register

- Endpoint: /register
- Method: POST
- Description: Registers a new user with the provided username, email, and password. Returns a JSON response with a success or error message.

### Login

- Endpoint: /login
- Method: POST
- Description: Logs in a user with the provided login credentials (username or email and password). Returns a JSON response with a success or error message and the user's username.

### Logout

- Endpoint: /logout
- Method: POST
- Description: Logs out the current user. Returns a JSON response with a success message and a status code of 200. If an error occurs during logout, returns a JSON response with an error message and a status code of 400.

### Get All Lists

- Route: /lists
- Method: GET
- Function: get_all_lists
- Description: Retrieves all lists from the database for the authenticated user.
  Returns: A JSON response containing a success message and a list of all the user's lists. If the user is not authenticated, returns a JSON response with an error message and a 401 status code. If there is an error retrieving the lists, returns a JSON response with an error message and a 400 status code.

### Add List

- Route: /add_list
- Method: POST
- Function: add_list
- Description: Adds a new list to the database for the authenticated user.
  Returns: A JSON response with a success message and status code 200 if the list is added successfully. A JSON response with an error message and status code 400 if there is an error adding the list. A JSON response with an error message and status code 401 if the user is not authenticated.

### Update Order

- Route: /update_order
- Method: POST
- Function: update_order
- Description: Updates the order indexes of lists in the database.
- Returns: A JSON response with a success message and a 200 status code if the update is successful. A JSON response with an error message and a 400 status code if the update fails. A JSON response with a message indicating that the user is not authenticated and a 401 status code if the user is not authenticated.

### Update List Name

- Route: /update_list_name
- Method: PATCH
- Function: update_list_name
  Description: Updates the name of a list in the database.
- Returns: A JSON response with a success or failure message and status code.

### Delete List

- Route: /delete_list/<list_id>
- Method: DELETE
- Function: delete_list
- Description: Deletes a list with the given list_id from the database.
- Returns: A JSON response containing a success or failure message and a status code.

### Update Order (Duplicate)

- Route: /update_order
- Method: POST
- Function: update_order
- Description: Updates the order indexes of lists in the database.
- Returns: A JSON response with a success message and a 200 status code if the update is successful. A JSON response with an error message and a 400 status code if the update fails. A JSON response with a message indicating that the user is not authenticated and a 401 status code if the user is not authenticated.

### Add Task

- Route: /add_task
- Method: POST
- Function: add_task
- Description: Adds a new task to the database.
- Returns: A JSON response containing a success or failure message and a status code.

### Get All Tasks

- Route: /tasks
- Method: GET
- Function: get_all_tasks
- Description: Retrieves all tasks from the database for the authenticated user.
- Returns: A JSON response containing a success message and a list of all the user's tasks. If the user is not authenticated, returns a JSON response with an error message and a 401 status code. If there is an error retrieving the tasks, returns a JSON response with an error message and a 400 status code.

### Update Task

- Route: /update_task/<task_id>
- Method: PATCH
- Function: update_task
- Description: Updates the details of a task in the database.
- Returns: A JSON response with a success or failure message and status code.

### Delete Task

- Route: /delete_task/<task_id>
- Method: DELETE
- Function: delete_task
- Description: Deletes a task with the given task_id from the database.
- Returns: A JSON response containing a success or failure message and a status code.
