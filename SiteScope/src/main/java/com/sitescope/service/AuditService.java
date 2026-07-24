package com.sitescope.service;

import com.sitescope.model.AuditResponse;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
public class AuditService {

    public AuditResponse auditWebsite(String url) throws Exception {

        long start = System.currentTimeMillis();

        Connection.Response response = Jsoup.connect(url)
                .timeout(10000)
                .execute();

        long end = System.currentTimeMillis();

        Document document = response.parse();

        AuditResponse audit = new AuditResponse();

        audit.setStatus(response.statusCode());
        audit.setResponseTime(end - start);
        audit.setTitle(document.title());

        String metaDescription = document.select("meta[name=description]").attr("content");
        audit.setMetaDescription(metaDescription);

        audit.setH1Count(document.select("h1").size());

        Elements images = document.select("img");
        int missingAlt = 0;

        for (var img : images) {
            if (!img.hasAttr("alt") || img.attr("alt").trim().isEmpty()) {
                missingAlt++;
            }
        }

        audit.setMissingAltImages(missingAlt);

        String text = document.body().text();
        audit.setWordCount(text.split("\\s+").length);

        return audit;
    }
}