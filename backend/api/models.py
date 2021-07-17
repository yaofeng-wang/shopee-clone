from django.db import models


class UserProfile(models.Model):
    username = models.CharField(max_length=200)
    email = models.CharField(max_length=200)

class Product(models.Model):
    seller = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    # image_url = models

    