# Generated by Django 5.0.10 on 2025-02-28 22:10

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_alter_usuario_contrasenia'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carrera',
            name='imagen',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='image'),
        ),
        migrations.AlterField(
            model_name='pista',
            name='imagen',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='image'),
        ),
    ]
