from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    phoneNumbers = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='number',
        source='phonenumber_set')

    class Meta:
        model = Contact
        fields = ('id', 'name', 'gender', 'phoneNumbers')
