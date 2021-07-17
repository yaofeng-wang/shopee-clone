from rest_framework import serializers
from .models import Product, UserProfile

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['url', 'id', 'seller', 'name', 'price'] 

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['url', 'id', 'username', 'email'] 
