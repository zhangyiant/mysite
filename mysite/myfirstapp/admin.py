from django.contrib import admin

from .models import (
    Contact, PhoneNumber, BlankOptionTable, NoBlankOptionTable,
    ChoicesOptionTable,
    HelpTextOptionTable
)

# Register your models here.

admin.site.register(Contact)
admin.site.register(PhoneNumber)

admin.site.register(BlankOptionTable)
admin.site.register(NoBlankOptionTable)

admin.site.register(ChoicesOptionTable)
admin.site.register(HelpTextOptionTable)
