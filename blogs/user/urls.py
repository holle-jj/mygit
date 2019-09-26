
from django.urls import path
from . import views
urlpatterns = [
    path("login/",views.login),
    path("register/",views.register),
    path("registerHandler/",views.registerHandler),
    path("loginHandler/",views.loginHandler),
    # path("loginA/",views.loginA),
    # # path("index/",views.index),
    # path("registerA/",views.registerA),

]
