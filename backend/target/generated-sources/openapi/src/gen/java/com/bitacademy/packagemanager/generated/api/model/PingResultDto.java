package com.bitacademy.packagemanager.generated.api.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import org.springframework.lang.Nullable;
import java.time.OffsetDateTime;
import jakarta.validation.constraints.NotNull;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * PingResultDto
 */

@JsonTypeName("PingResult")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2026-05-13T10:04:48.339123+02:00[Europe/Amsterdam]", comments = "Generator version: 7.22.0")
public class PingResultDto {

  private Boolean result;

  public PingResultDto() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public PingResultDto(Boolean result) {
    this.result = result;
  }

  public PingResultDto result(Boolean result) {
    this.result = result;
    return this;
  }

  /**
   * Get result
   * @return result
   */
  @NotNull
  @Schema(name = "result", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("result")
  public Boolean getResult() {
    return result;
  }

  @JsonProperty("result")
  public void setResult(Boolean result) {
    this.result = result;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    PingResultDto pingResult = (PingResultDto) o;
    return Objects.equals(this.result, pingResult.result);
  }

  @Override
  public int hashCode() {
    return Objects.hash(result);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class PingResultDto {\n");
    sb.append("    result: ").append(toIndentedString(result)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(@Nullable Object o) {
    return o == null ? "null" : o.toString().replace("\n", "\n    ");
  }
}

