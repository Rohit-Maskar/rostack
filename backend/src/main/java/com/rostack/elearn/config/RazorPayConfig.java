package com.rostack.elearn.config;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RazorPayConfig {
    @Value("${razorpay.key}")
    private String key;

    @Value("${razorpay.secret}")
    private String secret;

    public RazorpayClient getClient() throws RazorpayException {
        return new RazorpayClient(key, secret);
    }
}

