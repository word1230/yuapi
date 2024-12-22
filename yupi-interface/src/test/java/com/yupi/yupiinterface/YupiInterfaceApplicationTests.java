package com.yupi.yupiinterface;

import com.yupi.yuapiclientsdk.client.YuAPiClient;
import com.yupi.yuapiclientsdk.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import javax.jws.soap.SOAPBinding;

@SpringBootTest
class YupiInterfaceApplicationTests {

    @Resource
    public YuAPiClient yupiClient;

    @Test
    void contextLoads() {

        String result = yupiClient.getNameByGet("yupipipii");

        User user = new User();
        user.setUsername("yuyuyu");

        String userNameByPost = yupiClient.getUserNameByPost(user);



    }

}
