# Generated by Django 2.1.7 on 2019-04-15 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myfirstapp', '0003_mytablename'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutoIDTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('my_field', models.CharField(max_length=200)),
            ],
        ),
    ]
