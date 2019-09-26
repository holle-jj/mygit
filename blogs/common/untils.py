import json
def returnResult(code,mgs,data=""):
    '''
    :param code: 0代表success ！=0 代表error
    :param mgs:  返回的信息
    :param data: 返回扥数据
    :return:
    '''
    returndata1={
        "code":code,
        "mgs":mgs,
        "data":data
    }
    returndata = json.dumps(returndata1)
    return returndata