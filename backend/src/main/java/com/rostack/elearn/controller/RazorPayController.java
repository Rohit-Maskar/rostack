package com.rostack.elearn.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.rostack.elearn.DTO.payment.PaymentResponseDto;
import com.rostack.elearn.config.RazorPayConfig;
import com.rostack.elearn.service.impl.EmailService;
import com.rostack.elearn.service.impl.RazorPayService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class RazorPayController {

    @Autowired
    private RazorPayConfig razorpayConfig;
    @Autowired
    private EmailService emailService;

    @Autowired
    private RazorPayService razorPayService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        int amount = (int) data.get("amount"); // in paise

        RazorpayClient client = razorpayConfig.getClient();

        JSONObject options = new JSONObject();
        options.put("amount", amount); // 100 = ₹1.00
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        Order razorOrder = client.orders.create(options);
       razorPayService.saveRazorPayOrder(razorOrder);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", razorOrder.get("id"));
        response.put("amount", razorOrder.get("amount"));
        response.put("currency", razorOrder.get("currency"));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentResponseDto paymentResponse) {
        // Validate Razorpay signature (optional, recommended)
        // Save payment ID, user info, course ID, amount etc.
        razorPayService.saveRazorPayPayment(paymentResponse);
        String driveLink = "https://drive.google.com/drive/folder/abc123"; // static or dynamic per course
        emailService.sendCourseAccessEmail(paymentResponse.getEmail(), paymentResponse.getCourseName(), driveLink);
        return ResponseEntity.ok(Map.of("message", "Payment recorded"));
    }

}

