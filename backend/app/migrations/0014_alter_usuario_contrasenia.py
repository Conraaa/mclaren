# Generated by Django 5.0.10 on 2025-02-13 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_usuario_contrasenia'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='contrasenia',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
