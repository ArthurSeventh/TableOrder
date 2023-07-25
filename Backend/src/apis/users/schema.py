from apiflask import Schema, fields
from src.schemas.user_schema import UserSchema
from src.schemas.role_schema import RoleSchema

#-----------------------------Regist Schema------------------------------
class RegisterInSchema(UserSchema):
    class Meta:
        fields = ("username", "password", "fullname", "phone", "email")


class RegisterOutSchema(UserSchema):
    class Meta:
        fields = ("id", "username", "fullname", "phone", "email")



#-----------------------------Login Schema------------------------------
class LoginInSchema(UserSchema):
    class Meta:
        fields = ("username", "password")


class LoginOutSchema(UserSchema):
    role_key = fields.String()
    class Meta:
        fields = ("id", "username", "fullname", "phone", "email")


#-----------------------------Verify Token Schema------------------------------
class VerifyTokenSchema(UserSchema):
    role_key = fields.String()
    class Meta:
        fields = ("id", "username", "fullname", "phone", "email")


#-----------------------------Get list Schema------------------------------
class GetListInSchema(Schema):
    search_string = fields.String(required=False, allow_none=True)


class GetListOutSchema(UserSchema):
    class Meta:
        fields = ("id", "username", "fullname", "avatar","phone")

#-----------------------------Get DETAILS Schema------------------------------
class GetDetailOutSchema(UserSchema):
    class Meta:
        fields = ("id", "username", "fullname", "phone", "email", "role","avatar")

#-----------------------------UPDATE Schema------------------------------
class UpdateInSchema(UserSchema):
    file_input = fields.File(required = False, allow_none = True)
    class Meta:
        fields = ("phone", "email","file_input","fullname")

#-----------------------------ASSIGN ROLE Schema------------------------------
class AssignRoleInSchema(UserSchema):
    class Meta:
        fields = ("role_id",)

#-----------------------------CHANGE PASSWORD Schema------------------------------
class ChangePasswordInSchema(Schema):
    old_password = fields.String(required=True)
    new_password = fields.String(required=True)
