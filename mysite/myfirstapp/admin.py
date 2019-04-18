from django.contrib import admin

from .models import (
    Contact, PhoneNumber, BlankOptionTable, NoBlankOptionTable
)

# Register your models here.

admin.site.register(Contact)
admin.site.register(PhoneNumber)

admin.site.register(BlankOptionTable)
admin.site.register(NoBlankOptionTable)
