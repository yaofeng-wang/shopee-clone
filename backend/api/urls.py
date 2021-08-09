from .views import ProductViewSet, UserProfileViewSet, ProductSearchListView, GetUserId, GetUserProducts
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'userprofiles', UserProfileViewSet)
urlpatterns = router.urls
urlpatterns += [
    path('products-filter/', ProductSearchListView.as_view()),
    path('user-id/', GetUserId.as_view()),
    path('user-products/<int:id>', GetUserProducts.as_view({'get': 'list'})),
]
