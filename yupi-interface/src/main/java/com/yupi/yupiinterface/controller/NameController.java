package com.yupi.yupiinterface.controller;


import com.yupi.yuapiclientsdk.model.User;
import com.yupi.yuapiclientsdk.utils.SignUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("name")
public class NameController {

    //1.创建三个接口

    @GetMapping("/")
    public String getNameGet(String name) {
        return  "GET:"+ name;
    }

    @PostMapping("/")
    public String getNamePost(String name) {
        return "POST:"+name;
    }

    @PostMapping("/user")
    public String getUserNamePost(@RequestBody User user, HttpServletRequest request) {
        //1. 获取 2.校验


        String accessKey = request.getHeader("accessKey");
        String body =request.getHeader("body");
        String nonce = request.getHeader("nonce");
        String timestamp = request.getHeader("timestamp");
        String sign = request.getHeader("sign");




        //todo 从数据库查secretkey
        String secret = "abcdefgh";
        String signauth = SignUtils.getSign(body, secret);
        if(!signauth.equals(sign)) {
            throw new RuntimeException("无权限");
        }

        //todo 从数据库查来校验
        if(!accessKey.equals("yupi")) {
            throw new RuntimeException("无权限");
        }

        //校验随机数
        if(Long.parseLong(nonce)>10000) {
            throw new RuntimeException("无权限");
        }

        //todo 校验时间不能超过5min


        return "POST json:"+user.getUsername();
    }


}
