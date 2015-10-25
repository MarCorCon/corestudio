package com.OneWingSoft.corestudio.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

/**
 * Spring Boot Security configuration Class to provide access to the application resources.
 * @author Ignacio González Bullón <natete981@gmail.com>
 * @since 17 oct. 2015
 */
@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class CorestudioSecurityConfig extends WebSecurityConfigurerAdapter {

	private static PasswordEncoder encoder;
	
	@Autowired
	private UserDetailsService customUserDetailsService;
	
	/**
	 * @see WebSecurityConfigurerAdapter#configure(HttpSecurity)
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
//		http.csrf().disable().authorizeRequests().anyRequest().permitAll();

//		http
//			.csrf()
//		.and()
//			.addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
//			.exceptionHandling()
//		.and()
//			.formLogin()
//			.loginProcessingUrl("/api/authentication")
//			.usernameParameter("username")
//			.passwordParameter("password")
//			.permitAll()
//		.and()
//			.logout()
//			.logoutUrl("/api/logout")
//			.deleteCookies("JSESSIONID")
//			.permitAll()
//		.and()
//			.authorizeRequests()
//			.antMatchers("/user").authenticated()
//			.antMatchers("/professor").authenticated();
			
		
		
			
			
		http.authorizeRequests().antMatchers("/user", "/index").authenticated();
		
		http
		 .formLogin()
		 .loginProcessingUrl("/api/authentication")
		 .failureUrl("/401")
		 .usernameParameter("username")
		 .passwordParameter("password")	
		 .permitAll()
		 .and()
		 .logout()
		 .logoutSuccessUrl("/login")
		 .and()
		 .csrf().csrfTokenRepository(csrfTokenRepository())
		 .and()
		 .addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
	}
	
	/**
	 * @see WebSecurityConfigurerAdapter#configure(AuthenticationManagerBuilder)
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
	}
	
	/**
	 * Method that returns a new {@link OncePerRequestFilter} Filter to manage Angular cookies
	 * @return {@link Filter} to manage Angular cookies
	 */
	private Filter csrfHeaderFilter() {
		return new OncePerRequestFilter() {
			@Override
			protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
					FilterChain filterChain) throws ServletException, IOException {
				
				// Spring put the CSRF token in session attribute "_csrf"
		        CsrfToken csrfToken = (CsrfToken) request.getAttribute("_csrf");

		        // Send the cookie only if the token has changed
		        String actualToken = request.getHeader("X-CSRF-TOKEN");
		        if (actualToken == null || !actualToken.equals(csrfToken.getToken())) {
		            // Session cookie that will be used by AngularJS
		            String pCookieName = "CSRF-TOKEN";
		            Cookie cookie = new Cookie(pCookieName, csrfToken.getToken());
		            cookie.setMaxAge(-1);
		            cookie.setHttpOnly(false);
		            cookie.setPath("/");
		            response.addCookie(cookie);
		        }
		        filterChain.doFilter(request, response);
			}
		};
	}

	/**
	 * 
	 * @return
	 */
	private CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-CSRF-TOKEN");
		return repository;
	}
	
	/**
	 * Method to use PasswordEncoder as a singleton
	 * @return
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		if (encoder == null) {
			encoder = new BCryptPasswordEncoder();
		}

		return encoder;
	}
}
