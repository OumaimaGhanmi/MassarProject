package com.example.business.Services;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface ImageStorage {
    String store(MultipartFile file);
    Resource loadResource(String filename);
    void deleteAll();
    void init();
    Stream<Path> loadFiles();
    ResponseEntity<Resource> downloadUserImage(String imageName, HttpServletRequest request);
}
