from django.urls import path
from . import views
urlpatterns = [
    path("blogsList/",views.blogsList),
    path("addblogs/",views.addblogs),
    path("addblogsHandler/",views.addblogsHandler),
    path("getblogsList/",views.getblogsList),
    path("getauthor/",views.getauthor),
    path("articleinfo/",views.articleinfo),
    path("getarticleinfo/",views.getarticleinfo)
]