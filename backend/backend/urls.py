import os
from django.contrib import admin
from django.urls import path, include
from .views import index
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path("", index)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if os.environ.get('DEBUG_ENV', 'False') == 'True':
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
