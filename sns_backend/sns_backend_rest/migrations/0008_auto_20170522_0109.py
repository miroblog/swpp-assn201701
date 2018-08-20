# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-22 01:09
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sns_backend_rest', '0007_auto_20170522_0106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wall',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wall_owner', to=settings.AUTH_USER_MODEL),
        ),
    ]
