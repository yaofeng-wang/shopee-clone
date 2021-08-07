from .views import ProductViewSet, UserProfileViewSet,ProductSearchListView
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'userprofiles', UserProfileViewSet)
urlpatterns = router.urls
urlpatterns += [
    path('products-filter/', ProductSearchListView.as_view())
]
