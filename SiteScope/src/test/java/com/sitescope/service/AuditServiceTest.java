package com.sitescope.service;

import com.sitescope.model.AuditResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class AuditServiceTest {

    AuditService auditService = new AuditService();

    @Test
    void testWebsiteAudit() throws Exception {

        AuditResponse response =
                auditService.auditWebsite("https://spring.io");

        assertEquals(200, response.getStatus());

        assertNotNull(response.getTitle());

        assertTrue(response.getWordCount() > 0);

        assertTrue(response.getH1Count() >= 1);

    }
}