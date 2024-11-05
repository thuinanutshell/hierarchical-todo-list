from flask import Flask
from flask_cors import CORS
from models import db, Users
from tasks import bp_task
from lists import bp_list
from auth import bp_auth
from flask_login import LoginManager

# Initialize the Flask application
# The app is directly created so there is no need to use the export FLASK_APP=app.py command
# To run this application, simply run python app.py
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for all routes
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Configure the SQLAlchemy database URI
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

# Register blueprints for different parts of the application
app.register_blueprint(bp_task)  # Blueprint for task-related routes
app.register_blueprint(bp_list)  # Blueprint for list-related routes
app.register_blueprint(bp_auth)  # Blueprint for authentication-related routes

# Initialize the Flask-Login extension
login_manager = LoginManager()
login_manager.init_app(app)

# Set the secret key for session management
app.secret_key = "test"


@login_manager.user_loader
def load_user(id):
    """
    Load a user from the database given their ID.

    Args:
        id (int): The ID of the user to load.

    Returns:
        User: The user object associated with the given ID.
    """
    return db.session.get(Users, id)


db.init_app(app)
with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return "<p>Backend is working! </p>"


if __name__ == "__main__":
    app.run(port=5001, debug=True)
