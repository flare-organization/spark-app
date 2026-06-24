package com.flare.spark.backend.auth;

import com.flare.spark.generated.api.model.LoginRequestDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;

    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(
        @Valid @RequestBody LoginRequestDto loginRequest
    ) {
        Authentication authenticationRequest =
            UsernamePasswordAuthenticationToken.unauthenticated(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            );

        Authentication authenticationResponse =
                this.authenticationManager.authenticate(authenticationRequest);

//        HttpSessionSecurityContextRepository;

        return ResponseEntity.ok().build();
    }
}