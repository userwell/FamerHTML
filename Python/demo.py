import requests
import json
import main

fruit = ['萝卜','苹果','西瓜',
        '辣椒','草莓','南瓜',
        '火龙果','橘子','芒果',
        '椰子','菠萝','木瓜',
        '葡萄','化肥','超级化肥',
        '黄宝石','桂圆'
        ]
def star():
    url = "http://139.196.208.160:30007/app/farm/market.price"  # 替换为目标 API 的地址
        # 发送 POST 请求
    response = requests.post(url, json={"userId": "6659"})  # 替换为实际的请求体
    data = response.json()['data']
    for i,data in enumerate(data):
        print(str(i) + str(data))
    print(main.parseData(response))


if __name__=='__main__':
    star()
