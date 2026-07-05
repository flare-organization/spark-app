package com.flare.spark.backend.bundles;

import com.flare.spark.backend.user.User;
import com.flare.spark.backend.user.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
public class BundleService {

    private final BundleRepository repository;
    private final UserService userService;

    public BundleService(BundleRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    public Slice<Bundle> getAllBundles(int page) {
        Pageable pageWithFiveElements = PageRequest.of(page, 5);

        return repository.findAllBy(pageWithFiveElements);
    }

    public Bundle createBundle(Bundle bundle) {
        User authenticatedUser = userService.getCurrentAuthenticatedUser();
        bundle.setUser(authenticatedUser);

        return repository.save(bundle);
    }

    public Slice<Bundle> searchBundlesByName(
        String query,
        int page
    ) {
        Pageable pageWithFiveElements = PageRequest.of(page, 5);
        return repository.findPublicByNameContainingIgnoreCase(query, pageWithFiveElements);
    }
}