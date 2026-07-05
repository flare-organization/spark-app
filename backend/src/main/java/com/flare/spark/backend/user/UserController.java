package com.flare.spark.backend.user;

import com.flare.spark.generated.api.model.SignUpRequestDto;
import com.flare.spark.generated.api.model.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/api/v1/signup")
    public UserDto register(
            @Valid @RequestBody SignUpRequestDto signUpRequestDto,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        User user = userMapper.signUpRequestDtoToUser(signUpRequestDto);
        User savedUser = userService.register(user, request, response);

        return userMapper.userToUserDto(savedUser);
    }

    @GetMapping("/api/v1/me")
    public UserDto getAuthenticatedUser() {
        User user = userService.getCurrentAuthenticatedUser();
        return userMapper.userToUserDto(user);
    }
}
