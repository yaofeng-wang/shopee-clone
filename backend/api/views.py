from django.shortcuts import render
from .models import Product, UserProfile
from rest_framework import generics
from .serializers import ProductSerializer, UserProfileSerializer
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.response import Response

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class ProductSearchListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class GetUserId(APIView):
    
    def post(self, request, format=None):
        email = request.data.get('email', None)
        username = request.data.get('username', None)
        user = UserProfile.objects.get_or_create(username=username, email=email)        
        return Response(user[0].pk)

class GetUserProducts(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination

    def get(self, request, id, format=None):
        products = self.get_queryset().filter(seller=id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)