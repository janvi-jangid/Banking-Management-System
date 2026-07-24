package com.sitescope.controller;

import com.sitescope.model.AuditResponse;
import com.sitescope.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/audit")
@CrossOrigin("*")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @GetMapping
    public AuditResponse audit(@RequestParam("url") String url) throws Exception {

        System.out.println("Received URL = " + url);

        return auditService.auditWebsite(url);
    }
}