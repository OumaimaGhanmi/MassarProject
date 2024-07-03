package com.example.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.Builder;

 
import java.time.Instant;
 
@Data
@NoArgsConstructor
 @AllArgsConstructor
@Builder
public class ErrorResponse {
  private int status;
  private String error;
  private Instant timestamp;
  private String message;
  private String path;
}