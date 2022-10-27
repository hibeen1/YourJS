package com.project.yourjs.api.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.yourjs.api.req.UserRegisterPostReq;
import com.project.yourjs.api.service.UserService;
import com.project.yourjs.common.dto.LoginDto;
import com.project.yourjs.common.dto.TokenDto;
import com.project.yourjs.common.dto.UserDto;
import com.project.yourjs.common.jwt.JwtFilter;
import com.project.yourjs.common.jwt.TokenProvider;
import com.project.yourjs.db.repository.UserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "user", description = "회원관리")
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    
    public UserController(UserService userService, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    // @PostMapping("/test-redirect")
    // public void testRedirect(HttpServletResponse response) throws IOException {
    //     response.sendRedirect("/api/user");
    // }

    @Operation(summary = "회원 가입")
    @PostMapping
    public ResponseEntity<UserDto> signup(
            @Valid @RequestBody UserRegisterPostReq userRegisterPostReq
    ) {
        return ResponseEntity.ok(userService.signup(userRegisterPostReq));
    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUserId(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }
    @Operation(summary = "아이디 중복 확인")
    @PostMapping("/duple/userid")
    public String isDuplicatedUID(@RequestBody String userId) {
        return userService.isDuplicatedUID(userId);
    }

    @Operation(summary = "닉네임 중복 확인")
    @PostMapping("/duple/nickname")
    public String isDuplicatedUNN(@RequestBody String nickname) {
        return userService.isDuplicatedUNN(nickname);
    }

    @Operation(summary = "유저 권한 확인", description = "접속한 계정의 권한을 확인합니다.")
    @GetMapping("/roles")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }

    @Operation(summary = "유저 권한 확인", description = "다른 유저의 권한을 확인합니다.")
    @GetMapping("/roles/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(userId));
    }
}
