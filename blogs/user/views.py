from django.shortcuts import render,redirect
from django.http import HttpResponse
from datetime import datetime,timedelta
import json
import pymysql
import random
from common import untils,db
# Create your views here.

# 登录
def login(request):
    return render(request,"login/login.html")
# 登录处理
def loginHandler(request):
    # 接收前端提交的数据
    username = request.POST.get("username")
    pwd = request.POST.get("pwd")
    email = request.POST.get("email")
    # 查找user表格中id and pwd  进行判断
    sql = "SELECT id,pwd FROM blogs_user WHERE username=%s"
    data=(username)
    # 调用select类方法  获取当前符合的第一条数据
    userinfo=db.Db.select(sql,0,data)
    if userinfo=="error":
        return HttpResponse(untils.returnResult(1, "登录错误"))
    if userinfo:
    #     当用户名存在的时候
        if pwd==userinfo["pwd"]:
            response=HttpResponse(untils.returnResult(0, "登陆成功",{"uid":userinfo["id"]}))
            response.set_cookie("uid",userinfo["id"])
            return response
        return HttpResponse(untils.returnResult(1, "密码错误"))
    return HttpResponse(untils.returnResult(1, "用户名错误"))

# 注册
def register(request):
    return render(request,"login/register.html")
# 注册处理
def registerHandler(request):
    # 接收前端提交的数据
    username=request.POST.get("username")
    pwd = request.POST.get("pwd")
    email=request.POST.get("email")
    # 查找user表格中所有数据 满足username=username的数据
    sql="SELECT * FROM blogs_user WHERE username=%s"
    data=(username)
    # 调用select类方法 获取符合条件的第一行
    userList=db.Db.select(sql,0,data)
    if userList=="error":
        return HttpResponse(untils.returnResult(1, "注册失败"))
    # 判断 userList是否为null
    if userList:
    #     不为空时
        return HttpResponse(untils.returnResult(1,"当前用户名已存在"))
    # 未注册时获取当前时间
    now = datetime.now()
    key="username,pwd,registtime"
    value="%s,%s,%s"
    data = (username,pwd,now)
    if email:
        # email 有输入
        key+=",email"
        value+=",%s"
        data = (username,pwd,now,email)
    sql = "INSERT INTO blogs_user("+key+")values ("+value+")"
    # 调用query类方法
    result=db.Db.query(sql,data)
    if result=="error":
        return HttpResponse(untils.returnResult(1, "注册失败"))
    return HttpResponse(untils.returnResult(0,"注册成功"))




# def registerA(request):
#     username = request.POST.get("username")
#     pwd = request.POST.get("pwd")
#     email = request.POST.get("email")
#     response = render(request, 'login/registerA.html', {})
#     response.set_cookie('user', username, max_age=60 * 60 * 24 * 7)
#     return response





# def loginA(request):
#     # 提取游览器中的cookie，如果不为空，表示为已登录帐号
#     username = request.COOKIES.get('username')
#     if not username:
#         return redirect('/user/registerA')
#     return render(request, 'loginA.html', {'curr_name': username})









