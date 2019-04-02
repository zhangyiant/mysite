from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.views import generic
from rest_framework import generics
from .models import Contact, PhoneNumber
from .serializers import ContactSerializer


class IndexView(generic.ListView):
    template_name = 'myfirstapp/index.html'
    context_object_name = 'contacts'

    def get_queryset(self):
        return Contact.objects.all()

class ContactInfoView(generic.DetailView):
    model = Contact
    template_name = 'myfirstapp/contact-info.html'

class ContactPhoneNumbersView(generic.DetailView):
    model = Contact
    template_name = 'myfirstapp/phone-numbers.html'

class ContactListCreateAPIView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ContactDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
