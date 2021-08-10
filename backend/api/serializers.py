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
    seller_username = serializers.SerializerMethodField()
    product_name = serializers.SerializerMethodField()
    product_price = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = ['seller_username', 'product_name', 'product_price', 'creation_datetime'] 
    
    def get_seller_username(self, instance):
        return instance.seller.username

    def get_product_name(self, instance):
        return instance.product.name
    
    def get_product_price(self, instance):
        return instance.product.price
