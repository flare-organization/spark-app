package com.flare.spark.backend.emailing;

import lombok.Builder;

@Builder
public record Email(String from, String to, String subject, String body) {}
