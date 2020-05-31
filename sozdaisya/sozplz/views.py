from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import HttpResponsePermanentRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings 
from datetime import datetime 
from .models import Message
from django.contrib import auth
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
		
def login(request):
    if request.method == "POST":
        user = authenticate(username=request.POST.get("LoginField"), password=request.POST.get("PasswordField"))
        if user is not None:
            auth.login(request, user)
            return HttpResponseRedirect("/suc")
        else:
            return HttpResponse(status=405)
    elif request.method == "GET":
        if request.user is not None:
            auth.logout(request)
        return render(request, "Stranica.html")

def forgot(request):
    if request.method == "POST":
        Email=request.POST.get("Email")
        user=User.objects.get(email__exact=Email)
        send_mail(user.username, 'Для восстановления пароля пройдите по ссылке ' + 'http://127.0.0.1:8000/vost?id=' + str(user.id), settings.EMAIL_HOST_USER, [Email])
		
    return render(request, "Forget.html")
	
def create(request):
    if request.method == "POST":
        Login=request.POST.get("Login")
        Email=request.POST.get("Email")
        Password=request.POST.get("Password")
        PasswordRep=request.POST.get("PasswordRep")
        if (Password == PasswordRep):
            user = User.objects.create_user(Login, Email, Password)
            return HttpResponseRedirect("Stranica.html")
        else:
        	return render(request, "Create.html")
    elif request.method == "GET":
        return render(request, "Create.html")

def vost(request):
    idU=request.GET.get('id',0)
    user=User.objects.get(id=idU)
    if request.method=="POST":
        Password=request.POST.get("Password")
        PasswordRep=request.POST.get("PasswordRep")
        if (Password == PasswordRep):
            user.set_password(Password)
            user.save()
            return HttpResponsePermanentRedirect("Stranica.html")
    return render(request, "Vost.html")
		
@login_required
def suc(request):
    if request.method == "GET":
        return render(request, "123.html")
		
@csrf_exempt
def sucAPI(request):
	if request.method=="GET":
		arr=[]
		for message in Message.objects.order_by('date'):
			arr.append({'text': message.text, 'date': str(message.date), 'username': message.user.username})
		content=json.dumps(arr)
		return HttpResponse(content,content_type="application/json")
		#return JsonResponse(json.dumps(arr))
	if request.method=="POST":
		mes = Message()
		jsondata=json.loads(request.body)
		mes.text = jsondata["text"]
        
		mes.user = request.user
		mes.date = datetime.now()
		mes.save()
		arr=[]
		for message in Message.objects.order_by('date'):
			arr.append({'text': message.text, 'date': str(message.date), 'username': message.user.username})
		content=json.dumps(arr)
		return HttpResponse(content,content_type="application/json")
