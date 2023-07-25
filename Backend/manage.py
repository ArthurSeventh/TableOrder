import click
from flask.cli import with_appcontext


@click.command("init")
@with_appcontext
def init():
    from extension import db
    from src.models.user_model import User
    from src.models.role_model import Role
    changes = 0
    if not Role.query.filter(Role.key == "A").first():
        admin_role = Role(**{"key": "A", "name": "ADMIN"})
        print("Creating Admin(A) role...")
        db.session.add(admin_role)
        changes += 1
    else:
        admin_role = Role.cquery().filter(Role.key == "A").one()
        print("Admin(A) role already exist !")
    if not Role.query.filter(Role.key == "U").first():
        user_role = Role(**{"key": "U", "name": "USER"})
        print("Creating User(U) role...")
        db.session.add(user_role)
        changes += 1
    else:
        print("User(U) role already exist !")

    if not User.query.filter(User.is_super).first():
        super_admin = User(**{
            "username": "systemadmin",
            "password": "systemadmin123",
            "fullname": "systemadmin",
            "is_super": True,
            "role_id": admin_role.id
        })
        print("Creating superadmin...")
        db.session.add(super_admin)
        changes += 1
    else:
        print("superadmin already exist !")

    if changes > 0:
        db.session.commit()
        print("Project init finished !")
    else:
        print("Nothing changed")
