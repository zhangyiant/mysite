# Generated by Django 2.1.7 on 2019-04-17 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myfirstapp', '0005_noautoidtable'),
    ]

    operations = [
        migrations.CreateModel(
            name='NoNullOptionTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('my_field', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='NullOptionTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('my_field', models.CharField(max_length=200, null=True)),
            ],
        ),
    ]
