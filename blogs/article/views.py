from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
import pymysql
import json
from common import untils,db

# Create your views here.

# 添加博客
def addblogs(request):
    return render(request, "article/addblogs.html")

def addblogsHandler(request):
    title=request.POST.get("title")
    uid = request.POST.get("uid")
    content = request.POST.get("content")
    sql="SELECT * FROM article WHERE title=%s"
    data=title
    # 调用select类方法
    titleinfo=db.Db.select(sql,0,data)
    if titleinfo=="error":
        return HttpResponse(untils.returnResult(1, "发布失败"))
    if titleinfo:
    #     该标题存在
        return HttpResponse(untils.returnResult(1, "该标题存在"))
    sql="INSERT INTO article(title,uid)values (%s,%s)"
    data=(title,uid)
    db.Db.query(sql,data)
# cursor.lastrowid跟conn.insert_id()的结果相同   获取最后一条记录的id值
    insertId=db.Db.getlastInsertid()
    sql1 = "INSERT INTO articlecontent(content,aid)values (%s,%s)"
    data1 = (content, insertId)
    db.Db.query(sql1, data1)
    db.Db.commit()
    return HttpResponse(untils.returnResult(0, "发布成功"))
def getauthor(request):
    '''
    通过前端的uid换取username
    :param request:
    :return:
    '''
    uid = request.GET.get("uid")
    sql="SELECT username FROM blogs_user WHERE id=%s"
    data=uid
    # 调用select类方法 获取第一条数据
    userinfo=db.Db.select(sql,0,data)
    return HttpResponse(untils.returnResult(0, "",userinfo))

# 博客列表
def blogsList(request):
    '''
    渲染博客列表
    :param request:
    :return:
    '''
    # 获取cookie中uid
    uid=request.COOKIES["uid"]
    sql = "SELECT * FROM article WHERE uid=%s"
    data = (uid)
    articleList = db.Db.select(sql, 1, data)
    db.Db.commit()
    context={
        "articleList":articleList
    }
    print(articleList)
    return render(request,"article/blogsList.html",context)

def getblogsList(request):
    '''
    通过前端传的uid换取article表里的内容传到前端渲染页面
    :param request:
    :return:
    '''
    uid=request.GET.get("uid")
    sql="SELECT * FROM article WHERE uid=%s"
    data=(uid)
    articleList=db.Db.select(sql,1,data)
    db.Db.commit()
    return HttpResponse(untils.returnResult(0,"",articleList))

def articleinfo(request):
    return render(request,"article/articleinfo.html")

def getarticleinfo(request):
    '''
    点击标题时要获取文章详情，so 要给文章标题添加超链接
    通过id换取文章详情
    :param request:
    :return:
    '''
    aid=request.GET.get("id")
    print(aid)
    sql="SELECT article.title,articlecontent.content FROM article join articlecontent on article.id=articlecontent.aid WHERE article.id=%s"
    data=aid
    articleList=db.Db.select(sql,0,data)
    db.Db.commit()
    return HttpResponse(untils.returnResult(0, "",articleList))

