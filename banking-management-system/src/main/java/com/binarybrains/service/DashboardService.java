package com.binarybrains.service;

import com.binarybrains.dao.DashboardDAO;
import com.binarybrains.model.Dashboard;

public class DashboardService {

    private DashboardDAO dashboardDAO = new DashboardDAO();

    public Dashboard getDashboardData() {
        return dashboardDAO.getDashboardData();
    }
}