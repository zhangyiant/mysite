from django.urls import path
from . import views

urlpatterns = [
    path('contact/',
        views.ContactListCreateAPIView.as_view(),
        name="contact_list"),
    path('contact/<int:pk>/',
        views.ContactDetailAPIView.as_view(),
        name="contact_detail")
]
