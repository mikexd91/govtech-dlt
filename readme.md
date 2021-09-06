**Fancy Todo List**

Changelog:

1. In the basic version, a task is either done or not done. A user should be able to create and delete todo items, view the list to do, and mark items as done.
   * Attached Postman as well (toDoList_1.postman_collection.json)
2. Extend your design to support the following features:
   * Assigning more statuses to todo items (e.g.: in-progress, under review, blocked)
   * Assign priorities to todo items
   * Adding due dates to todo items
   * Make sure your new design makes it easy to filter and display to-do items in whatever way the user may reasonably expect.
   * Attached Postman as well (toDoList_2.postman_collection.json)
   * Improved styling on frontend
   * Improved Error Handling on backend
3. Support a notion of users, where each user has a list of friends and a single todo list. Extend your design to support an "accountability" feature, where users can allow friends to view their todo list and progress. Make sure to allow users to mark some todo items as "private." If a todo item is "private," then no-one may view it or be given any information that it exists.
   * Added Linting
   * Added Swagger
   * Refactor Frontend Components
   * Attached Postman as well (toDoList_2.postman_collection.json)

**How to run:**

1. ```
   npm run dev
   ```

   to run both client and server concurrently

   1. http://localhost:5000 (backend)
   2. http://localhost:5000/api-doc (swagger)
   3. http://localhost:8080 (frontend)
2. ```
   npm run test
   ```


**How to use:**

1. Register using a name, will be auto logged in after
2. Under logged in user, you can

   1. create new task, choosing private or public task
   2. update task
   3. delete task
   4. view other user's public task
   5. only add/edit/delete your own task
