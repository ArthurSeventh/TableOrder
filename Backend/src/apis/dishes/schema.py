from apiflask import Schema, fields
from src.schemas.dishes_schema import DishesSchema



class getMenuSchema(DishesSchema):
    class Meta:
        fields = ("type", "image", "name", "description", "price","id")
       
class addDishesSchemaIn(DishesSchema):
    file_input = fields.File()
    class Meta:
        fields = ("type", "name", "description", "price","file_input")

class addDishesSchemaOut(DishesSchema):
    class Meta:
        fields = ("type", "name", "description", "price", "image")

