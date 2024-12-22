package com.yupi.yuapiclientsdk.client;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONUtil;
import com.yupi.yuapiclientsdk.model.User;
import com.yupi.yuapiclientsdk.utils.SignUtils;

import java.util.HashMap;
import java.util.Map;

public class YuAPiClient {

    private String accessKey;
    private String secretKey;

    public YuAPiClient(String accessKey, String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    public String getNameByGet(String name) {
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("name", name);
        String result= HttpUtil.get("http://localhost:8123/api/name/", paramMap);
        System.out.println(result);
        return result;

    }
    public String getNameByPost( String name) {

        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("name", name);

        String result= HttpUtil.post("http://localhost:8123/api/name/", paramMap);
        System.out.println(result);
        return result;
    }

    //todo 为啥删注解
    private Map<String,String> getHeaderMap(String body){
        Map<String,String> map = new HashMap<>();
        map.put("accesskey", accessKey);
//        map.put("secretkey", secretKey);
        map.put("nonce", RandomUtil.randomNumbers(4));
        map.put("timestamp", String.valueOf(System.currentTimeMillis()/1000));
        map.put("body",body);

        map.put("sign", SignUtils.getSign(body, secretKey));


        return map;


    }


    public String getUserNameByPost( User user) {
        String json = JSONUtil.toJsonStr(user);
        HttpResponse execute = HttpRequest.post("http://localhost:8123/api/name/user/")
                .addHeaders(getHeaderMap(json))
                .body(json)
                .execute();
        System.out.println(execute.getStatus());
        String result = execute.body();
        System.out.println(result);
        return result;
    }
}
