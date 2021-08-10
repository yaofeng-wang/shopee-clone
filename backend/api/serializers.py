from rest_framework import serializers
from .models import Product, UserProfile, Transaction

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'seller', 'name', 'price', 'image', 'creation_datetime'] 

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'creation_datetime'] 


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'buyer', 'seller', 'product', 'creation_datetime'] 