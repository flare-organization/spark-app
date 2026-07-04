package com.flare.spark.backend.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Table(name = "core_users")
public class User {
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