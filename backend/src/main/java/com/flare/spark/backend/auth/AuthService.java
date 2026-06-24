package com.flare.spark.backend.auth;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

public class AuthService {

    private final PasswordEncoder passwordEncoder;

    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    UserDetailsManager users(DataSource dataSource) {
        String username = "Piet";
        String encodedPassword = passwordEncoder.encode("something");

        UserDetails user = User.builder()
                .username(username)
                .password(encodedPassword)
                .roles("USER")
                .build();

        JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
        users.createUser(user);

        return users;
    }
}
