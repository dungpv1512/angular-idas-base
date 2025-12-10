import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Auth Interceptor - Thêm authentication token vào headers
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Lấy token từ localStorage hoặc sử dụng token mặc định
  let token = localStorage.getItem('access_token');
  
  // Nếu không có token trong localStorage, sử dụng token demo
  if (!token) {
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkZEODYxQTM0NEFBOTI4M0IyRjg1RkE1QzcyRTcxMjBCRTM0RTUwMzVSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6Il9ZWWFORXFwS0RzdmhmcGNjdWNTQy1OT1VEVSJ9.eyJuYmYiOjE3NjUzNDE3MTAsImV4cCI6MTc2NTM0NTMxMCwiaXNzIjoiaHR0cHM6Ly9zc29kZW1vLmlkYXNvbmxpbmUuY29tIiwiYXVkIjoiY29tbW9ucy5hcGkiLCJjbGllbnRfaWQiOiJ3ZWJjbGllbnRwcm9kdWN0X2h5YnJpZF9jbGllbnRjcmVkZW50aWFscyIsInN1YiI6IjEzNjYiLCJhdXRoX3RpbWUiOjE3NjUyNDk4NzgsImlkcCI6ImxvY2FsIiwiSXNTdXBlckFkbWluIjoiVHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTM2NiIsIlVzZXJOYW1lIjoiZHVuZ3B2MTUxMkBnbWFpbC5jb20iLCJVc2VySWQiOiIxMzY2IiwianRpIjoiRjdBQjg3OTlBRUI3OEFBODQ5RTM0RDhFMDlGQkNEMDIiLCJzaWQiOiJGMkMxMjdCN0NDNEQ2Q0I4NThENThEMTUyNjc5OEYyNiIsImlhdCI6MTc2NTM0MTcxMCwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInNoYXJlZC5zY29wZSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.of_G1jYxJCkYSXPELSW9fUdfosvq8wXJPGX__sZK72BxBVnYgMQ2JngNMEXwBop1QbzUEk6bbpuzg8WPwfFjXP4mheMPfHG1Xc7AlCKvnkPVzU416UXLDBjfQPPB_doFONsXyXUSYZlAGhnXpXIHp1LDsGZdZ8oBislR8Nq7Py_28mxvEDVtbrCHUhN6nsb_omRvtjVcS64zTtWsR6RBvssHriuLXNkJUcaSF9QRRdCJ_ZaXHlmUSD56NaI7OUb7ip7BsWTIoY3D9PrGyxv1demCJR8eTUtdNtAAM8P-ZFyuyV5s6NlO587Ywxy9ezHPKOTEh93YNS7Pcu6ugy_C7xc2PcEklUCD2OiWiKxl4YVu5wuYxUwg_Cm3DnnB5sGikKlSstR61VKIZi0V0Jojhp9YVPWxmyUFZ58MiyNRYWdmNulGrGAFb7SY1U0FD2zzrn_DraS4ouBJKYs43vVJ4tI3ks0ZkX48AmMYznAYAsnz6VmzPDH_dYe2dW1fRlbOcw7NtIPUg3xdyeiAji2GrT8hayZulLUwALY_QVWgynXPc9qjZVJ2iXMpW6trbOHPLFbXhLtqmQqhMo3noAIHByudQrODjGWCC7C9-K51PB-D2UpNKWldlkc4hzUREKykzrhsE2L6OO0-ekOw4uKsxzQDK4Ti8G1g_8yYSVWJOHo';
  }

  // Clone request và thêm headers
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  return next(authReq);
};
