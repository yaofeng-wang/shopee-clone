from rest_framework import serializers
from .models import Product, UserProfile

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['seller', 'name', 'price', 'image'] 

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email'] 
