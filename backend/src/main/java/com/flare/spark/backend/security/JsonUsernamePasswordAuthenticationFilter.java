package com.flare.spark.backend.security;

import com.flare.spark.generated.api.model.LoginRequestDto;
import com.flare.spark.generated.api.model.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextRepository;
import tools.jackson.databind.ObjectMapper;

public class JsonUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public JsonUsernamePasswordAuthenticationFilter(
        AuthenticationManager authenticationManager,
        SecurityContextRepository securityContextRepository
    ) {
        super(authenticationManager);

        setFilterProcessesUrl("/api/v1/login");
        setSecurityContextRepository(securityContextRepository);

        setAuthenticationSuccessHandler((req, res, auth) -> {
            UserDto user = new UserDto(auth.getName());

            res.setStatus(HttpStatus.OK.value());
            res.setContentType("application/json");
            new ObjectMapper().writeValue(res.getOutputStream(), user);
        });
        setAuthenticationFailureHandler((req, res, ex) -> res.setStatus(HttpStatus.NOT_FOUND.value()));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (!request.getContentType().contains("application/json")) {
            return super.attemptAuthentication(request, response);
        }

        try {
            LoginRequestDto credentials = new ObjectMapper().readValue(request.getInputStream(), LoginRequestDto.class);

            var authRequest = UsernamePasswordAuthenticationToken
                    .unauthenticated(credentials.getUsername(), credentials.getPassword());

            setDetails(request, authRequest);

            return getAuthenticationManager().authenticate(authRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
