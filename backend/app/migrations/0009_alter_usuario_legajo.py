# Generated by Django 5.0.10 on 2025-02-10 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_remove_usuario_groups_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='legajo',
            field=models.BigIntegerField(blank=True, null=True, unique=True),
        ),
    ]
