package com.binarybrains.security;

import com.binarybrains.session.SessionManager;

public class RoleGuard {

    public static boolean isAdmin() {
        return SessionManager.getUser() != null &&
                "ADMIN".equalsIgnoreCase(SessionManager.getUser().getRole());
    }

    public static boolean isUser() {
        return SessionManager.getUser() != null &&
                "USER".equalsIgnoreCase(SessionManager.getUser().getRole());
    }
}