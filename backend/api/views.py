from django.shortcuts import render
from .models import Product, UserProfile
from rest_framework import generics
from .serializers import ProductSerializer, UserProfileSerializer
from rest_framework import viewsets

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
