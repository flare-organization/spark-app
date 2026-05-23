package com.flare.spark.backend.packages;

import com.flare.spark.backend.packages.dto.PackageDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/packages")
public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @GetMapping
    public List<PackageDto> getAllPackages() {
        return packageService.getAllPackages()
                .stream()
                .map(p -> {
                    PackageDto dto = new PackageDto();
                    dto.id = p.getId();
                    dto.name = p.getName();
                    return dto;
                })
                .toList();
    }

}
