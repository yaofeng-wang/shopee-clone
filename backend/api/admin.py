from django.contrib import admin
from .models import Product, UserProfile, Transaction

class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ('creation_datetime',)
admin.site.register(Product, ProductAdmin)

class UserProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('creation_datetime',)
admin.site.register(UserProfile, UserProfileAdmin)

class TransactionAdmin(admin.ModelAdmin):
    readonly_fields = ('creation_datetime',)
admin.site.register(Transaction, TransactionAdmin)
