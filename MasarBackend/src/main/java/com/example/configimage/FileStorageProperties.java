package com.example.configimage;



import lombok.Getter;

import lombok.Setter;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "file")
//@NoArgsConstructor
//@AllArgsConstructor
@Getter
@Setter
@Component
public class FileStorageProperties {
    private String uploadImgUsersDir;

 

}