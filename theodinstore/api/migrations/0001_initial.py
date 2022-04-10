from django.db import migrations
from api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor): # This method will create a superuser
        user = CustomUser(
            name="odin",
            email="nomankazi739@gmail.com",
            is_staff=True,
            is_superuser=True,
            phone="7698253121",
            gender="Male"
        )

        user.set_password("Godofwar@odin0")
        user.save()

    dependencies = [

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
