# Generated by Django 2.1.7 on 2019-04-14 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myfirstapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutoTableName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('my_field', models.CharField(max_length=200)),
            ],
        ),
    ]
