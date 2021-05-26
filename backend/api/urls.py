from .views import ProductList
from django.urls import path

urlpatterns = [
    path('products/', ProductList.as_view()),
]