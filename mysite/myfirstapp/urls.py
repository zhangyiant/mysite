from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('<int:pk>/',
        views.ContactInfoView.as_view(),
        name="contact_info"),
    path('<int:pk>/phone-numbers/',
        views.ContactPhoneNumbersView.as_view(),  
        name="contact_phone_numbers"),
    path('api/contact/',
        views.ContactListAPIView.as_view(),
        name="contact_list"),
    path('api/contact/<int:pk>/',
        views.ContactDetailAPIView.as_view(),
        name="contact_detail")
]
