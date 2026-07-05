package com.flare.spark.backend.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "core_users")
public class User {

    public User(
        String username,
        String email,
        String password
    ) {
        this.username = username;
        this.email = email;
        this. password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Setter
    @Column(name = "username", unique = true)
    private String username;

    @Setter
    @Column(name = "email", unique = true)
    private String email;

    @Setter
    @Column(name = "password")
    private String password;
//
//    @Setter
//    @Column(columnDefinition = "userRole")
//    private List<BundleRole> bundleRoles;
}