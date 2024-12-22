package com.yupi.yuapiclientsdk;


import com.yupi.yuapiclientsdk.client.YuAPiClient;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ComponentScan
@ConfigurationProperties("yuapi.client")
public class YuApiClientConfig {

    private  String accessKey;
    private  String secretKey;

    @Bean
    public YuAPiClient YuAPiClient() {
        return new YuAPiClient(accessKey, secretKey);
    }

}
