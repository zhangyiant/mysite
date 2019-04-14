from django.db import models

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=200)
    gender = models.CharField(max_length=10)

class PhoneNumber(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    number = models.CharField(max_length=20)

class AutoTableName(models.Model):
    my_field = models.CharField(max_length=200)
    
class MyTableName(models.Model):
    class Meta:
        db_table = "my_abc_table"
    my_field = models.CharField(max_length=200)

