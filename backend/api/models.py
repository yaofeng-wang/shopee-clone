from django.db import models


class UserProfile(models.Model):
    username = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    creation_datetime = models.DateTimeField(auto_now=True)

class Product(models.Model):
    seller = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='product_image', blank=True)
    creation_datetime = models.DateTimeField(auto_now=True)

class Transaction(models.Model):
    buyer = models.ForeignKey(UserProfile, related_name='buyer', on_delete=models.CASCADE)
    seller = models.ForeignKey(UserProfile, related_name='seller', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    creation_datetime = models.DateTimeField(auto_now=True)
