package com.flare.spark.backend.shared.text;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SluggifierTest {

    @ParameterizedTest
    @MethodSource("provideNameAndExpectedSlugArguments")
    void testToSlug(String input, String expected) {
        assertEquals(expected, Sluggifier.toSlug(input));
    }

    public static Stream<Arguments> provideNameAndExpectedSlugArguments() {
        return Stream.of(
                Arguments.of("My bundle", "my-bundle"),
                Arguments.of("My epic bundle", "my-epic-bundle"),
                Arguments.of("HELLO WORLD", "hello-world"),
                Arguments.of("Hello World", "hello-world"),
                Arguments.of("hello world", "hello-world"),
                Arguments.of("  Hello World  ", "hello-world"),
                Arguments.of("Hello   World", "hello-world"),
                Arguments.of("   Hello   World   ", "hello-world"),
                Arguments.of("Hello-World", "hello-world"),
                Arguments.of("Hello--World", "hello-world"),
                Arguments.of("Hello --- World", "hello-world"),
                Arguments.of("Hello_World", "hello-world"),
                Arguments.of("Hello___World", "hello-world"),
                Arguments.of("Hello.World", "hello-world"),
                Arguments.of("Hello, World!", "hello-world"),
                Arguments.of("Hello: World", "hello-world"),
                Arguments.of("Hello; World", "hello-world"),
                Arguments.of("Hello/World", "hello-world"),
                Arguments.of("Product 123", "product-123"),
                Arguments.of("123 Product", "123-product"),
                Arguments.of("123", "123"),
                Arguments.of("Summer Sale 2025", "summer-sale-2025"),
                Arguments.of("Version 2.0", "version-2-0"),
                Arguments.of("Café au lait", "cafe-au-lait"),
                Arguments.of("Crème brûlée", "creme-brulee"),
                Arguments.of("São Paulo", "sao-paulo"),
                Arguments.of("München", "munchen"),
                Arguments.of("François", "francois"),
                Arguments.of("Rock & Roll", "rock-roll"),
                Arguments.of("Fish & Chips", "fish-chips"),
                Arguments.of("100% Awesome", "100-awesome"),
                Arguments.of("$99 Deal", "99-deal"),
                Arguments.of("Java@Spring#Boot", "java-spring-boot"),
                Arguments.of("test@example.com", "test-example-com"),
                Arguments.of("A", "a"),
                Arguments.of("ABC", "abc"),
                Arguments.of("foo-bar", "foo-bar"),
                Arguments.of("foo_bar", "foo-bar"),
                Arguments.of("foo.bar", "foo-bar"),
                Arguments.of("-----foo-----", "foo"),
                Arguments.of("__foo__", "foo"),
                Arguments.of("...foo...", "foo"),
                Arguments.of("foo     bar     baz", "foo-bar-baz"),
                Arguments.of("foo---bar---baz", "foo-bar-baz"),
                Arguments.of("", ""),
                Arguments.of(" ", ""),
                Arguments.of("     ", ""),
                Arguments.of("🎮 Gaming Bundle", "gaming-bundle"),
                Arguments.of("🔥 Hot Deal", "hot-deal"),
                Arguments.of("Bundle™ Edition®", "bundle-edition"),
                Arguments.of("L'Oréal Paris", "l-oreal-paris"),
                Arguments.of("Jack's Bundle", "jack-s-bundle"),
                Arguments.of("Nederland & België", "nederland-belgie"),
                Arguments.of("Ä Ö Ü", "a-o-u")
        );
    }
}