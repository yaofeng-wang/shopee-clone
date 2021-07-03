import os
from django.contrib import admin
from django.urls import path, include
from .views import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path("", index)
]

if os.environ.get('DEBUG_ENV', 'False') == 'True':
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
