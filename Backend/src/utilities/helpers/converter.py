import hashlib
from datetime import datetime


def milisecond_convert(dt: datetime):
    return int(dt.timestamp()*1000)


def md5_hash(str):
    return hashlib.md5(str.encode()).hexdigest()

#hexdigest():  trả về số thập lục phân với độ dài nhân đôi
#md5 type of md5_hash