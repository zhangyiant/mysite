# Generated by Django 2.1.7 on 2019-04-21 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myfirstapp', '0010_defaultcallableoption'),
    ]

    operations = [
        migrations.CreateModel(
            name='HelpTextOptionTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('my_field', models.CharField(help_text='This is my help text.', max_length=200)),
            ],
        ),
    ]