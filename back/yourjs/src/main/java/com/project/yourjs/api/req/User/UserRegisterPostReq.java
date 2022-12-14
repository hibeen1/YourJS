package com.project.yourjs.api.req.User;

//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /user) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
public class UserRegisterPostReq {
	private String userId;
	private String password;
	private String userName;
	private String nickname;
}
