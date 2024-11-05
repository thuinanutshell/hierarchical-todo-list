from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

# Initialize the SQLAlchemy object
db = SQLAlchemy()

class Users(db.Model, UserMixin):
    """
    Represents a user in the application.

    Attributes:
        id (int): The unique identifier for the user.
        username (str): The username of the user.
        email (str): The email address of the user.
        password_hash (str): The hashed password of the user.
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        """
        Returns a string representation of the user.

        Returns:
            str: A string representation of the user.
        """
        return f"User('{self.username}', lists: '{self.lists}')"

    def to_dict(self):
        """
        Converts the user object to a dictionary.

        Returns:
            dict: A dictionary representation of the user.
        """
        return {
            "id": self.id,
            "username": self.username,
            "lists": [list.to_dict() for list in self.lists],
        }

class Lists(db.Model):
    """
    Represents a list in the application.

    Attributes:
        id (int): The unique identifier for the list.
        name (str): The name of the list.
        user_id (int): The ID of the user who owns the list.
        tasks (list): A list of tasks associated with the list.
        order_index (int): The order index of the list.
    """

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    tasks = db.relationship("Tasks", backref="lists", lazy=True)
    order_index = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        """
        Converts the list object to a dictionary.

        Returns:
            dict: A dictionary representation of the list.
        """
        tasks = []
        return {
            "id": self.id,
            "name": self.name,
            "tasks": [task.to_dict() for task in self.tasks],
            "order_index": self.order_index,
        }

    def __repr__(self):
        return f"List('{self.name}', order_idx '{self.order_index}', tasks: '{self.tasks}')"


class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    task_depth = db.Column(db.Integer, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("tasks.id"))
    is_completed = db.Column(db.Boolean, nullable=False, default=False)
    subtasks = db.relationship(
        "Tasks",
        backref=db.backref("parent", remote_side=[id]),
        lazy=True,
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"Task('{self.name}, list_id: {self.list_id}, task_depth: {self.task_depth}, parent_id: {self.parent_id}, is_completed: {self.is_completed}, subtasks: {self.subtasks}')"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "list_id": self.list_id,
            "subtasks": [subtask.to_dict() for subtask in self.subtasks],
            "task_depth": self.task_depth,
            "parent_id": self.parent_id,
            "is_completed": self.is_completed,
        }
