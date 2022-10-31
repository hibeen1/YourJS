package com.project.yourjs.api.req;

import lombok.Getter;

import javax.persistence.Column;
import java.sql.Date;

@Getter
public class ProjectPostReq {

    private String projectName;
    private String tools;
    private String belongs;
    private Date startDate;
    private Date endDate;
    private String fileSrc;

}