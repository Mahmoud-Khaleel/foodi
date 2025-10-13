import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(cloned);
  }

  return next(req);
};
// import { HttpInterceptorFn } from '@angular/common/http';
// export const authInterceptor: HttpInterceptorFn = (req, next) => { const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDJjOGNlMGFiZGFkY2Q5NWIyNTVmMCIsImlhdCI6MTc2MDI4NzUxNSwiZXhwIjoxNzYwMzczOTE1fQ.fWT30Ea4MIcWW6-HxEe7d5jZZjKMrHljUuS_YGANVS4'; if (authToken) { const authReq = req.clone({ setHeaders: { Authorization: Bearer ${authToken} }, }); console.log('➡️ Outgoing Request:', { url: authReq.url, method: authReq.method, headers: authReq.headers.keys().map((k) => ({ key: k, value: authReq.headers.get(k), })), }); return next(authReq); } return next(req); };
