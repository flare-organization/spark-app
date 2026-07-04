package com.flare.spark.backend.user;

import com.flare.spark.generated.api.model.SignUpRequestDto;
import com.flare.spark.generated.api.model.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto userToUserDto(User bundle);
    User UserDtoToUser(UserDto bundleDto);
    User signUpRequestDtoToUser(SignUpRequestDto signUpRequestDto);
}