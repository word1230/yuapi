package com.yupi.yuapiclientsdk.utils;


import cn.hutool.crypto.digest.DigestAlgorithm;
import cn.hutool.crypto.digest.Digester;

public class SignUtils {

    public  static String getSign(String body,String secretKey){
        Digester digester=new Digester(DigestAlgorithm.SHA256);
        String content = body+"."+secretKey;
        // DigestUtil.sha256Hex(content)
        return digester.digestHex(content);


    }



}
