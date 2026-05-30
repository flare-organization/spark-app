package com.flare.spark.backend;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

// This file is a showcase and always (both) true test
@ExtendWith(MockitoExtension.class)
class MockitoSetupTest {

    interface StringHolder {
        String hold(String name);
    }

    @Mock
    StringHolder holder;

    @Test
    void mockitoIsWiredUp() {
        when(holder.hold("world")).thenReturn("hello world");

        String result = holder.hold("world");

        assertThat(result).isEqualTo("hello world");
        verify(holder).hold("world");
    }

    @Test
    void greeterRespondsWrong() {
        when(holder.hold("world")).thenReturn("this will fail");
        String result = holder.hold("world");
        assertThat(result).isNotEqualTo("hello world");
    }
}