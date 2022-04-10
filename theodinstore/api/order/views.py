from ast import Try
from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        # Bad request
        return JsonResponse({'error': 'Invalid session, please login again'}, status=400)

    if request.method == 'POST':
        user_id = id
        transaction_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['products']
        total_product = len(products.split(',')[:-1])
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            # Bad request
            return JsonResponse({'error': 'Invalid user'}, status=400)

        order = Order(user=user, product_names=products, total_products=total_product,
                      transactions_id=transaction_id, total_amount=amount)
        order.save()
        # OK
        return JsonResponse({'success': True, 'error': False, 'message': 'Order placed successfully'}, status=200)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer
