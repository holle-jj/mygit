import pymysql
class Db(object):
    # 初始化为None
    conn=None
    cursor=None

    @classmethod
    #     查的方法  传参sql语句，type获取的类型 data
    def select(cls,sql,type,data=()):
        '''
        :param sql:
        :param type: 0---fetchone   1--fetchall 2---rowcont
        :param data:
        :return:
        '''
        Db.link()
        try:
            Db.cursor.execute(sql,data)
            if type==0:
                return Db.cursor.fetchone()
            elif type==1:
                return Db.cursor.fetchall()
            else:
                return Db.cursor.rowcount
        except Exception as e:
            return "error"

#     增删改的方法
    @classmethod
    def query(cls,sql,data=()):
        Db.link()
        try:
            Db.cursor.execute(sql,data)
        except Exception as e:
            return "error"
    @classmethod
    def getlastInsertid(cls):
        '''
        获取最后一条记录的id值
        :return:
        '''
        return Db.cursor.lastrowid
#   commit 的方法
    @classmethod
    def commit(cls):
        Db.conn.commit()
#   关闭数据库的方法
    @classmethod
    def close(cls):
        Db.cursor.close()
        Db.conn.close()
#  当获取游标的时候 需要重新连接数据库
    @classmethod
    def link(cls):
#    此方法为了给conn和cursor赋值  首先进行判断conn和cursor的值是否为none
        if Db.conn!=None and Db.cursor!=None:
            return
        Db.conn = pymysql.Connect(
            host='localhost',  ##mysql服务器地址
            port=3306,  ##mysql服务器端口号
            user='root',  ##用户名
            passwd='MyNewPwd123!@#',  ##密码
            db='blogs',  ##数据库名
            charset='utf8'  ##连接编码
        )
        Db.cursor = Db.conn.cursor(cursor=pymysql.cursors.DictCursor)

    def __init__(self):
        Db.close()
