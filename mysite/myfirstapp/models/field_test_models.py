from datetime import datetime
from django.db import models

class AutoTableName(models.Model):
    my_field = models.CharField(max_length=200)
    
class MyTableName(models.Model):
    class Meta:
        db_table = "my_abc_table"
    my_field = models.CharField(max_length=200)

class AutoIDTable(models.Model):
    my_field = models.CharField(max_length=200)

class NoAutoIDTable(models.Model):
    my_field = models.CharField(max_length=200, primary_key=True)

class NullOptionTable(models.Model):
    my_field = models.CharField(max_length=200, null=True)

class NoNullOptionTable(models.Model):
    my_field = models.CharField(max_length=200, null=False)

class BlankOptionTable(models.Model):
    my_field = models.CharField(max_length=200, blank=True)

class NoBlankOptionTable(models.Model):
    my_field = models.CharField(max_length=200, blank=False)

class ChoicesOptionTable(models.Model):
    my_field = models.CharField(max_length=200,
        choices=(
            ('1', "Apple"),
            ('2', "Banana"),
            ('3', "Pear")))

class DefaultStringTable(models.Model):
    my_field = models.CharField(max_length=200,
        default="HelloWorld")

def my_callable_object():
    return str(datetime.now())
    
class DefaultCallableOptionTable(models.Model):
    my_field = models.CharField(max_length=200,
        default=my_callable_object)

class HelpTextOptionTable(models.Model):
    my_field = models.CharField(max_length=200,
        help_text="This is my help text.")
    
class PrimaryKeyOptionTable(models.Model):
    my_field = models.CharField(max_length=200,
        primary_key=True)

class UniqueOptionTable(models.Model):
    my_field = models.CharField(max_length=200,
        unique=True) 

